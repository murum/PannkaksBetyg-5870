import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCirsePC-nOaLe99LJvGZ04yYN-cJqWaA",
  authDomain: "pancakeratings.firebaseapp.com",
  projectId: "pancakeratings",
  storageBucket: "pancakeratings.firebasestorage.app",
  messagingSenderId: "969916576953",
  appId: "1:969916576953:web:b420edda8fbb48c4285768",
  measurementId: "G-K86LY897VR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };