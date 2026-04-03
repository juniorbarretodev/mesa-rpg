import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

console.log('ENV CHECK:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  allEnv: import.meta.env
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validação básica de configuração
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.apiKey.length > 10;

let app;
try {
  if (isConfigValid) {
    app = initializeApp(firebaseConfig);
  } else {
    console.warn("Firebase: API Key ausente ou inválida no .env. Algumas funcionalidades não estarão disponíveis.");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export const auth = isConfigValid ? getAuth(app) : null;
export const db = isConfigValid ? getFirestore(app) : null;
export const rtdb = isConfigValid ? getDatabase(app) : null;
export const APP_INTERNAL_DOMAIN = import.meta.env.VITE_APP_INTERNAL_DOMAIN || 'rpgapp.internal';
export const firebaseInitialized = isConfigValid;
