import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBkHMCgZwKdIYHOU_a3RX3iOIwZVS2oWXg",
  authDomain: "cadastrolivroautor.firebaseapp.com",
  projectId: "cadastrolivroautor",
  storageBucket: "cadastrolivroautor.appspot.com",
  messagingSenderId: "33378811603",
  appId: "1:33378811603:web:aedc40fcbd965d1e519e26"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
export{db}