import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBry7dNkfXeJJEyuuSTBwM4mWX2ycXYynM",
  authDomain: "dannymoore-autos-ltd.firebaseapp.com",
  projectId: "dannymoore-autos-ltd",
  storageBucket: "dannymoore-autos-ltd.firebasestorage.app",
  messagingSenderId: "1027781605759",
  appId: "1:1027781605759:web:4c87e5f7b55eaad4d6c24a",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);