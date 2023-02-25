import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBMqmeDUWARlAf_Yb2J2pJuBmidJ5rzbRM",
    authDomain: "cinema-6df49.firebaseapp.com",
    projectId: "cinema-6df49",
    storageBucket: "cinema-6df49.appspot.com",
    messagingSenderId: "805461826492",
    appId: "1:805461826492:web:31fb220587b404cf79e9b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();