
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu2BHGFdN8qDyfMO6evVkhtEeF9hFYkWA",
  authDomain: "web-shop-91204.firebaseapp.com",
  projectId: "web-shop-91204",
  storageBucket: "web-shop-91204.firebasestorage.app",
  messagingSenderId: "1057479873509",
  appId: "1:1057479873509:web:87f0a71b3cb92dea64950c",
  measurementId: "G-MZ1RZLT1PV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  