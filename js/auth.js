import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, firebaseInitialized } from './firebase.js';

const checkInit = () => {
  if (!firebaseInitialized) {
    throw new Error('Configuração do Firebase ausente no arquivo .env. Por favor, siga as instruções em FIREBASE_SETUP.md.');
  }
};

export const AuthSystem = {
  currentUser: null,
  currentNick: null,
  currentRoomCode: null,

  waitForInitialization() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        this.currentUser = user;
        this.currentNick = user?.displayName || null;
        unsubscribe();
        resolve(user);
      });
    });
  },

  generateFakeEmail(username) {
    return `${username.toLowerCase().trim()}@mesarpg.com`;
  },

  // Salva/garante o perfil no Firestore (cria se não existir para evitar 404)
  async saveProfile() {
    const user = this.currentUser || auth.currentUser;
    if (!user) return false;

    const profileRef = doc(db, 'users', user.uid);
    const existing = await getDoc(profileRef);

    const updates = {
      nick: this.currentNick || user.displayName || user.email?.split('@')[0] || 'Jogador',
      updatedAt: serverTimestamp()
    };

    if (!existing.exists()) {
      updates.createdAt = serverTimestamp();
    }

    await setDoc(profileRef, updates, { merge: true });
    return true;
  },

  async register(nick, password) {
    checkInit();
    const email = this.generateFakeEmail(nick);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: nick });

    try {
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        nick,
        createdAt: serverTimestamp()
      });
    } catch (dbError) {
      console.warn("Firestore: Erro ao salvar perfil do usuário (pode ser regra de permissão):", dbError.message);
    }

    this.currentUser = userCredential.user;
    this.currentNick = nick;

    return userCredential.user;
  },

  async login(username, password) {
    checkInit();
    const fakeEmail = this.generateFakeEmail(username);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, fakeEmail, password);
      console.log("Logado com sucesso:", userCredential.user);

      this.currentUser = userCredential.user;
      this.currentNick = userCredential.user.displayName || username;

      return userCredential.user;
    } catch (error) {
      console.error("Erro ao logar:", error.code, error.message);
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        // Para novas versões do Firebase, invalid-credential abrange usuário não encontrado
        console.warn("Usuário não encontrado ou credenciais inválidas.");
      } else if (error.code === 'auth/wrong-password') {
        alert("Senha incorreta!");
      } else {
        alert("Erro ao entrar: " + (error.message || "Tente outro apelido ou senha"));
      }
      throw error; 
    }
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

  async updateUserProfile(updates) {
    const user = this.currentUser || auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    // Atualiza o perfil no Firebase Auth também (especialmente o displayName)
    if (updates.nick) {
      try {
        await updateProfile(user, { displayName: updates.nick });
      } catch (authErr) {
        console.warn('AuthProfile update failed (non-critical):', authErr.message);
      }
      this.currentNick = updates.nick;
    }

    // Salva no Firestore (sempre funciona)
    const profileRef = doc(db, 'users', user.uid);
    await setDoc(profileRef, {
      ...updates,
      updatedAt: serverTimestamp()
    }, { merge: true });

    return true;
  },

  async getUserProfile() {
    checkInit();
    const user = this.currentUser || auth.currentUser;
    if (!user) return null;

    const profileSnap = await getDoc(doc(db, 'users', user.uid));
    return profileSnap.exists() ? profileSnap.data() : null;
  },

  isAuthenticated() {
    return auth.currentUser !== null;
  }
};
