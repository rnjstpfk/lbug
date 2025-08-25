// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVF8O3X77FBZM2Ctm2UTRlAtNyHBQqwhM",
  authDomain: "lbug-6ee3f.firebaseapp.com",
  projectId: "lbug-6ee3f",
  storageBucket: "lbug-6ee3f.appspot.com", // 수정 완료
  messagingSenderId: "857157437576",
  appId: "1:857157437576:web:0066ae405d36705d52773d",
  measurementId: "G-8YP1CHR5HE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
