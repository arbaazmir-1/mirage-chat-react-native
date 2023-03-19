import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxvbEruTeyaZj84nwtlpkjxR_Eub7Iyuk",
    authDomain: "mirage-chat.firebaseapp.com",
    projectId: "mirage-chat",
    storageBucket: "mirage-chat.appspot.com",
    messagingSenderId: "772300777038",
    appId: "1:772300777038:web:76006ad5d2661515ebc51f"
  };

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth}