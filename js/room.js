import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";
import { ref, set, push, onValue, update, remove } from "firebase/database";
import { db, rtdb, firebaseInitialized } from './firebase.js';
import { AuthSystem } from './auth.js';

const checkInit = () => {
  if (!firebaseInitialized) {
    throw new Error('Configuração do Firebase ausente no arquivo .env.');
  }
};

export const RoomSystem = {
  currentRoom: null,
  currentRoomCode: null,
  isMaster: false,
  unsubscribers: [],

  generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  async createRoom(roomName) {
    checkInit();
    const code = this.generateRoomCode();
    const user = AuthSystem.currentUser;
    
    if (!user) throw new Error('Usuário não autenticado');

    const roomData = {
      name: roomName,
      masterId: user.uid,
      masterNick: AuthSystem.currentNick,
      code: code,
      createdAt: serverTimestamp(),
      status: 'waiting',
      battleMode: false
    };

    await setDoc(doc(db, 'rooms', code), roomData);
    
    await set(ref(rtdb, `rooms/${code}`), {
      masterId: user.uid
    });
    
    await set(ref(rtdb, `rooms/${code}/presence/${user.uid}`), {
      online: true,
      lastSeen: Date.now(),
      nick: AuthSystem.currentNick,
      role: 'master'
    });

    this.currentRoom = roomData;
    this.currentRoomCode = code;
    this.isMaster = true;
    AuthSystem.currentRoomCode = code;

    return code;
  },

  async joinRoom(code) {
    checkInit();
    const upperCode = code.toUpperCase();
    const roomSnap = await getDoc(doc(db, 'rooms', upperCode));
    
    if (!roomSnap.exists()) {
      throw new Error('Sala não encontrada. Verifique o código e tente novamente.');
    }

    const roomData = roomSnap.data();
    const user = AuthSystem.currentUser;

    if (!user) throw new Error('Usuário não autenticado');

    if (roomData.status === 'closed') {
      throw new Error('Esta sala foi encerrada');
    }

    await setDoc(doc(db, 'rooms', upperCode, 'players', user.uid), {
      nick: AuthSystem.currentNick || user.displayName || 'Jogador',
      role: 'player',
      online: true,
      joinedAt: serverTimestamp()
    }, { merge: true });

    await set(ref(rtdb, `rooms/${upperCode}/presence/${user.uid}`), {
      online: true,
      lastSeen: Date.now(),
      nick: AuthSystem.currentNick || user.displayName || 'Jogador',
      role: roomData.masterId === user.uid ? 'master' : 'player'
    });

    this.currentRoom = roomData;
    this.currentRoomCode = upperCode;
    this.isMaster = roomData.masterId === user.uid;
    AuthSystem.currentRoomCode = upperCode;

    return roomData;
  },

  async leaveRoom(code) {
    const user = AuthSystem.currentUser;
    if (!user) return;

    if (this.isMaster) {
      await setDoc(doc(db, 'rooms', code), { status: 'closed' }, { merge: true });
    } else {
      await remove(ref(rtdb, `rooms/${code}/presence/${user.uid}`));
    }

    this.cleanup();
  },

  subscribeToRoom(code, callbacks) {
    const roomRef = doc(db, 'rooms', code);
    const roomUnsub = onSnapshot(roomRef, (snap) => {
      if (snap.exists()) {
        this.currentRoom = snap.data();
        callbacks.onRoomUpdate?.(snap.data());
      }
    });

    const presenceRef = ref(rtdb, `rooms/${code}/presence`);
    const presenceUnsub = onValue(presenceRef, (snap) => {
      const players = [];
      snap.forEach((child) => {
        players.push({ id: child.key, ...child.val() });
      });
      callbacks.onPlayersUpdate?.(players);
    });

    this.unsubscribers.push(roomUnsub, () => presenceUnsub());
  },

  async updateRoomStatus(code, status) {
    await updateDoc(doc(db, 'rooms', code), { status });
  },

  async startSession() {
    if (!this.isMaster) throw new Error('Apenas o mestre pode iniciar');
    await this.updateRoomStatus(this.currentRoomCode, 'playing');
  },

  cleanup() {
    this.unsubscribers.forEach(unsub => unsub());
    this.unsubscribers = [];
    this.currentRoom = null;
    this.currentRoomCode = null;
    this.isMaster = false;
    AuthSystem.currentRoomCode = null;
  }
};
