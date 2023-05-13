import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLVWteUKxzpjeVIp3XGV940UEN1o_WRMA",
  authDomain: "cheapstop-ba4b1.firebaseapp.com",
  projectId: "cheapstop-ba4b1",
  storageBucket: "cheapstop-ba4b1.appspot.com",
  messagingSenderId: "91131084496",
  appId: "1:91131084496:web:0f195068a57809c3aee8d5",
  measurementId: "G-XDF1Z3LHP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

function inicioSesion(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('contraseña').value;
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert('Inicio de sesion correcto');
        window.location.href="../../index.html";
      })
      .catch((error) => {
        var errorMessage = error.message;           
        alert(errorMessage);
    });
}

document.getElementById("signIn").addEventListener("click", () => {
    inicioSesion();
});
