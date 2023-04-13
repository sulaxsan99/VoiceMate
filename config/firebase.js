import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore,collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  setDoc,
  where,
  uploadAudio,
  getDoc,collectionGroup,serverTimestamp,ref  } from 'firebase/firestore';

  import {getDatabase} from 'firebase/database'
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD2S5E6t83stjeh7U9rccnWHzMa44sR5vw",
  authDomain: "voicemart-f36d4.firebaseapp.com",
  projectId: "voicemart-f36d4",
  storageBucket: "voicemart-f36d4.appspot.com",
  messagingSenderId: "894939197640",
  appId: "1:894939197640:web:75cdf4da21858fbdf9b5fd"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore();
 const db=getDatabase(app);
export {
  db,
  auth,serverTimestamp,ref
};