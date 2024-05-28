import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4JVj0NCRFnVWWB8Bx_NJ8JSJuDK3dWAs",
  authDomain: "eating-91573.firebaseapp.com",
  projectId: "eating-91573",
  storageBucket: "eating-91573.appspot.com",
  messagingSenderId: "80061244712",
  appId: "1:80061244712:web:5ac5b794efab011158dc1d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);
export const db = getFirestore(app);
