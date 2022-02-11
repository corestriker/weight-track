// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Cofigs nach .env.local auslagern für github

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb87TaVIOXFKA5iep9NpUL63hOGpTwVDE",
  authDomain: "weight-tracker-a9673.firebaseapp.com",
  projectId: "weight-tracker-a9673",
  storageBucket: "weight-tracker-a9673.appspot.com",
  messagingSenderId: "643739810984",
  appId: "1:643739810984:web:fa37d27490b5583c2a969d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
//provider.setCustomParameters({ prompt: 'select_account' });

export { app, db, auth, provider };
