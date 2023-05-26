import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLVWteUKxzpjeVIp3XGV940UEN1o_WRMA",
    authDomain: "cheapstop-ba4b1.firebaseapp.com",
    projectId: "cheapstop-ba4b1",
    storageBucket: "cheapstop-ba4b1.appspot.com",
    messagingSenderId: "91131084496",
    appId: "1:91131084496:web:0f195068a57809c3aee8d5",
    measurementId: "G-XDF1Z3LHP8"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
document.getElementById("icono-volver").addEventListener("click", function(){
    window.location.href="../../../index.html";
  });
  document.getElementById("botonPerfil").addEventListener("click", function(){
    window.location.href="../UsuarioRegistrado/perfil.html";
  });
  document.getElementById("botonPreferencias").addEventListener("click", function(){
    window.location.href="../UsuarioRegistrado/preferencias.html";
  });
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const usuarioDesplegable = document.getElementById('usuario-desplegable');

    if (user) {
      // Usuario logeado
      document.getElementById("logout").addEventListener('click', () => {
        auth.signOut()
        .then(() => { 
          localStorage.setItem('radio', 2800)
          localStorage.setItem('combustible', 0)
          window.location.href="../../../index.html"; 
        })
        .catch(error => {console.error(error);})
      })
    } else {
        // Usuario no logeado
    }
  });