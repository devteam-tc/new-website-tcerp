import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyBlRXEac8sKBq86wwonvbY4pGEiFKg65aI",
//   authDomain: "blogtcerp.firebaseapp.com",
//   projectId: "blogtcerp",
// storageBucket: "blogtcerp.appspot.com",
//   messagingSenderId: "539708718938",
//   appId: "1:539708718938:web:ef822b1003f56a22037d63"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBmC8_22Lg9ftdI9CAO5dSazUqSbZklgMk",
  authDomain: "tcerp-newversion.firebaseapp.com",
  databaseURL: "https://tcerp-newversion-default-rtdb.firebaseio.com",
  projectId: "tcerp-newversion",
  storageBucket: "tcerp-newversion.firebasestorage.app",
  messagingSenderId: "870652555892",
  appId: "1:870652555892:web:e2ec66e914da10de84d721",
 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);