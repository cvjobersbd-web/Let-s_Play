// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXxFb31qqnmhys7LVD1Ox0xvRS633e4TU",
  authDomain: "casino-12479.firebaseapp.com",
  projectId: "casino-12479",
  storageBucket: "casino-12479.firebasestorage.app",
  messagingSenderId: "910540069529",
  appId: "1:910540069529:web:181cc0456bdb17677e3608",
  measurementId: "G-YH752RF0Y6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };