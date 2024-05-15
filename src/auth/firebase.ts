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
};

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBSIboJJiBwBD9EN0SFNME_qYF0BhsJdZc",
  authDomain: "releasifyweb.firebaseapp.com",
  projectId: "releasifyweb",
  storageBucket: "releasifyweb.appspot.com",
  messagingSenderId: "295987711543",
  appId: "1:295987711543:web:66c5cd8b89dfe9fd38b9b2"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };