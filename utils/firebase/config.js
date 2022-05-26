import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "luckyoffer-55ef8.firebaseapp.com",
    projectId: "luckyoffer-55ef8",
    storageBucket: "luckyoffer-55ef8.appspot.com",
    messagingSenderId: "732644681100",
    appId: "1:732644681100:web:90bfc0ad1c55e916a522a9"
};

// Initialize Firebase
const firebaseApp = !firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app();
const authentication = getAuth(firebaseApp);
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore()
export { authentication, db };