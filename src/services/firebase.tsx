import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcNHoMXQs8mVLjEt0Oae98cQ0sERLsdb4",
  authDomain: "reactlinks-c34fb.firebaseapp.com",
  projectId: "reactlinks-c34fb",
  storageBucket: "reactlinks-c34fb.firebasestorage.app",
  messagingSenderId: "335979022851",
  appId: "1:335979022851:web:c4a09533d4d30748535c36",
  measurementId: "G-F7CMGYYN3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}