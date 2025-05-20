import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpuvNgxAN-npyf-4HYqYxw9U6OhEV8cwQ",
  authDomain: "ecommerce-fdbbe.firebaseapp.com",
  projectId: "ecommerce-fdbbe",
  storageBucket: "ecommerce-fdbbe.firebasestorage.app",
  messagingSenderId: "409475692085",
  appId: "1:409475692085:web:07a6728c7d55d7b72ea37c",
  measurementId: "G-ETS02NKEST"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
export {auth, db};
export default app;