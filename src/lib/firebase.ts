// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe9O00Ttk8eo8rnOaTY_wQRRyTgsIWY6I",
  authDomain: "eatopia-723d1.firebaseapp.com",
  databaseURL: "https://eatopia-723d1-default-rtdb.firebaseio.com",
  projectId: "eatopia-723d1",
  storageBucket: "eatopia-723d1.firebasestorage.app",
  messagingSenderId: "746181935140",
  appId: "1:746181935140:web:4046aedebfbe4df5f718b1",
  measurementId: "G-DSHK81TFHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
