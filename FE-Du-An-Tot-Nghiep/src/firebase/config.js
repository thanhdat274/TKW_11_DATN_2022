import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDWqi2g5YNnprlDCT2KzrvBZpR3D4z45iY",
  authDomain: "datn11-e4b32.firebaseapp.com",
  projectId: "datn11-e4b32",
  storageBucket: "datn11-e4b32.appspot.com",
  messagingSenderId: "602373621048",
  appId: "1:602373621048:web:a9d83cceab7925e7576dcd",
  measurementId: "G-XHGZMY8RRR"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'vn';