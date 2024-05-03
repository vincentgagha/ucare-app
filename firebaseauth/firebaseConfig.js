// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9FNTX7wV3ZWWXrN-TtEdjmT7rIg0EBNo",
  authDomain: "ucare-app-58c04.firebaseapp.com",
  projectId: "ucare-app-58c04",
  storageBucket: "ucare-app-58c04.appspot.com",
  messagingSenderId: "345310486454",
  appId: "1:345310486454:web:80c2b2a7f1deedf6ebab17"
};
//Initialialize Firebase
const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = app;
export const FIREBASE_AUTH = getAuth (app);
export const FIREBASE_DB = getFirestore (app); 
export const storage = getStorage(app);