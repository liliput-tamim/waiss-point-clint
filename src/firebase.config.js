// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDDzZw8ZEe5oC1PGA6WSj8Rmy7hHkAqx0",
  authDomain: "waiss-point-blog.firebaseapp.com",
  projectId: "waiss-point-blog",
  storageBucket: "waiss-point-blog.firebasestorage.app",
  messagingSenderId: "515620417603",
  appId: "1:515620417603:web:180a7ff39670ab213d24f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
