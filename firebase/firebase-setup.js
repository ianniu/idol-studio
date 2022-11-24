// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyApZoHmYthQwzKuv9c-bS_Zs3B52V5FEeE",

  authDomain: "idol-studio.firebaseapp.com",

  projectId: "idol-studio",

  storageBucket: "idol-studio.appspot.com",

  messagingSenderId: "24826946783",

  appId: "1:24826946783:web:174846a0dfe70bf4f7b56a"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);