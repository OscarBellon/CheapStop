import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { translate, translatePlaceholder } from './translate.js';
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
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      var user = userCredentials.user;
        //alert('Inicio de sesion correcto');
        const ref = doc(db, 'usuarios', user.uid);
        const current = getDoc(ref).then((data) => {
          const userData = data.data();
          localStorage.setItem('radio', userData.radio)
          localStorage.setItem('combustible', userData.combustible)
          localStorage.setItem('language', userData.idioma)
          window.location.href="../../index.html";
        })
      })
      .catch((error) => {
        var errorMessage = error.message;           
        alert(errorMessage);
    });
}

document.getElementById("signInBoton").addEventListener("click", () => {
    inicioSesion();
});
