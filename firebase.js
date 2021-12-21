// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAgK45ct064ffisvhlmEJRVMF8hbavTy4U",
   authDomain: "next-firebase-a5c71.firebaseapp.com",
   projectId: "next-firebase-a5c71",
   storageBucket: "next-firebase-a5c71.appspot.com",
   messagingSenderId: "193275325255",
   appId: "1:193275325255:web:8bc3645e449dfce106fa62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db }