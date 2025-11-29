// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDGOq0D82ilJk6eNw_0W6hhMOz3VP4Uhk",
  authDomain: "fir-fighter-71a68.firebaseapp.com",
  projectId: "fir-fighter-71a68",
  storageBucket: "fir-fighter-71a68.firebasestorage.app",
  messagingSenderId: "94918624384",
  appId: "1:94918624384:web:f0dcfc8f92fc9827c71265"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);