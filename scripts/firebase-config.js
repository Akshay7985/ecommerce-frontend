import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-Qlij3h3r1-CXbACWOJ926uLIB5KXhvE",
  authDomain: "ecommerce-frontend-40e91.firebaseapp.com",
  projectId: "ecommerce-frontend-40e91",
  storageBucket: "ecommerce-frontend-40e91.appspot.com",
  messagingSenderId: "144384560685",
  appId: "1:144384560685:web:4ab81f1de6a4001dccb2a4",
  measurementId: "G-3ME2LK98MC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
