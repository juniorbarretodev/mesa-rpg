import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, APP_INTERNAL_DOMAIN, firebaseInitialized } from './firebase.js';

const checkInit = () => {
  if (!firebaseInitialized) {
    throw new Error('Configuração do Firebase ausente no arquivo .env. Por favor, siga as instruções em FIREBASE_SETUP.md.');
  }
};

export const AuthSystem = {
  currentUser: null,
  currentNick: null,
  currentRoomCode: null,

  generateFakeEmail(nick, roomCode) {
    const sanitizedNick = nick.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${sanitizedNick}_${roomCode}@${APP_INTERNAL_DOMAIN}`;
  },

  async register(nick, password, roomCode = 'global') {
    checkInit();
    const email = this.generateFakeEmail(nick, roomCode);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(userCredential.user, { displayName: nick });
    
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      nick,
      createdAt: serverTimestamp()
    });

    this.currentUser = userCredential.user;
    this.currentNick = nick;
    
    return userCredential.user;
  },

  async login(nick, password, roomCode = 'global') {
    checkInit();
    const email = this.generateFakeEmail(nick, roomCode);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    this.currentUser = userCredential.user;
    this.currentNick = userCredential.user.displayName || nick;
    
    return userCredential.user;
  },

  async logout() {
    await signOut(auth);
    this.currentUser = null;
    this.currentNick = null;
    this.currentRoomCode = null;
  },

  onAuthChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.currentNick = user?.displayName || null;
      callback(user);
    });
  },

  isAuthenticated() {
    return auth.currentUser !== null;
  }
};
