import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjug2tptOg1abQVOR3RV0P7wmj6dje2tQ",
  authDomain: "daycraft-aff7b.firebaseapp.com",
  projectId: "daycraft-aff7b",
  storageBucket: "daycraft-aff7b.firebasestorage.app",
  messagingSenderId: "229613936409",
  appId: "1:229613936409:web:0bb7bca10e813563f36f88",
  measurementId: "G-PWVXXZM9HE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();