// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBBhM1fKydBFbXycjToEwq-GAG7gRQ4LBw",
  authDomain: "releasify-web.firebaseapp.com",
  projectId: "releasify-web",
  storageBucket: "releasify-web.appspot.com",
  messagingSenderId: "500431081328",
  appId: "1:500431081328:web:7010cf0e8468a20529c9b5",
  measurementId: "G-X1Q5B8M5K5"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };