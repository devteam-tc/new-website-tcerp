import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBlRXEac8sKBq86wwonvbY4pGEiFKg65aI",
  authDomain: "blogtcerp.firebaseapp.com",
  projectId: "blogtcerp",
storageBucket: "blogtcerp.appspot.com",
  messagingSenderId: "539708718938",
  appId: "1:539708718938:web:ef822b1003f56a22037d63"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);