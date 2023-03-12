import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBUfUDrUv8P0_7C6aUptslZI0DgJxm8p-0",
    authDomain: "stanga1-b5077.firebaseapp.com",
    projectId: "stanga1-b5077",
    storageBucket: "stanga1-b5077.appspot.com",
    messagingSenderId: "802145990916",
    appId: "1:802145990916:web:39e55e1623694fad71b851"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);