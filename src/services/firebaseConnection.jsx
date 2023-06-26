import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBnPe5Xf_1T694eLMYlXQcwviHcEGzpGag",
  authDomain: "bookstore-e8667.firebaseapp.com",
  projectId: "bookstore-e8667",
  storageBucket: "bookstore-e8667.appspot.com",
  messagingSenderId: "980378135187",
  appId: "1:980378135187:web:be4d65398c869446aebb66"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
export{db}