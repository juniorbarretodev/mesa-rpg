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

  generateFakeEmail(username) {
    return `${username.toLowerCase().trim()}@mesarpg.com`;
  },

  async register(nick, password) {
    checkInit();
    const email = this.generateFakeEmail(nick);

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
      if (error.code === 'auth/user-not-found') {
        alert("Usuário não encontrado!");
      } else if (error.code === 'auth/wrong-password') {
        alert("Senha incorreta!");
      } else {
        console.error("Erro ao logar:", error.message);
      }
      throw error; // Throwing so index.html can handle the UI state (button loading, etc)
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

  isAuthenticated() {
    return auth.currentUser !== null;
  }
};
