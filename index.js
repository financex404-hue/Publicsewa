// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, addDoc, collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
window.signup = function() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then(() => alert("Signup Success"))
  .catch(err => alert(err.message));
}

// Login
window.login = function() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then(() => window.location.href = "index.html")
  .catch(err => alert(err.message));
}

// Logout
window.logout = function() {
  signOut(auth).then(() => window.location.href = "login.html");
}

// Add Problem
window.addProblem = async function() {
  let text = document.getElementById("problemText").value;

  await addDoc(collection(db, "problems"), {
    problem: text
  });

  alert("Problem Added");
  location.reload();
}

// Load Problems
async function loadProblems() {
  const querySnapshot = await getDocs(collection(db, "problems"));
  querySnapshot.forEach((doc) => {
    document.getElementById("problemList").innerHTML += 
      "<p>" + doc.data().problem + "</p>";
  });
}

if(document.getElementById("problemList")) {
  loadProblems();
}