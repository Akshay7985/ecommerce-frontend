// scripts/auth.js

// Import Firebase modules (from CDN, no npm install needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Your Firebase configuration (unchanged)
const firebaseConfig = {
  apiKey: "AIzaSyD-Qlij3h3r1-CXbACWOJ926uLIB5KXhvE",
  authDomain: "ecommerce-frontend-40e91.firebaseapp.com",
  projectId: "ecommerce-frontend-40e91",
  storageBucket: "ecommerce-frontend-40e91.firebasestorage.app",
  messagingSenderId: "144384560685",
  appId: "1:144384560685:web:4ab81f1de6a4001dccb2a4",
  measurementId: "G-3ME2LK98MC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== SIGNUP =====
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirm = document.getElementById("confirm-password").value.trim();

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert(`Signup successful! Welcome, ${name}!`);
      window.location.href = "login.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// ===== LOGOUT =====
document.addEventListener("click", (e) => {
  if (e.target.id === "logout-btn") {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
      })
      .catch((error) => alert(error.message));
  }
});

// ===== UPDATE HEADER =====
onAuthStateChanged(auth, (user) => {
  const authLink = document.getElementById("auth-link");
  if (authLink) {
    if (user) {
      authLink.innerHTML = `<button id="logout-btn" class="btn-logout">Logout</button>`;

    } else {
      authLink.innerHTML = `<a href="login.html" class="btn-login">Login</a>`;
    }
  }
});
