import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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

function registrar() {
  var name = document.getElementById('nombre').value;
  var surname = document.getElementById('apellido').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('contraseña').value;
  var repPassword = document.getElementById('repetir-contraseña').value;
  
  if(name.length < 3 || name.length > 30){
    alert(`Nombre mayor que 3 y menor que 30`);
    return;
  }
  if(surname.length < 3 || surname.length > 30){
    alert(`Apellido mayor que 3 y menor que 30`);
    return;
  }
  if(password.length < 8 || password.length > 20){
    alert(`Contraseña mayor que 8 y menor que 20`);
    return;
  }
  if(repPassword != password){
    alert(`Contraseñas no coinciden`);
    return;
  }




  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userProfile = {uid: user.uid, nombre: name, apellido: surname, email: email, password: password, radio: "2000", idioma:localStorage.getItem('language'), combustible:"gasolina95"}
      localStorage.setItem('radio', 2000)
      addUser(userProfile)
      alert('Usuario registrado!');
    })
    .catch((error) => {
      var errorMessage = error.message;       
      console.log(errorMessage)    
      if(errorMessage == "Firebase: Error (auth/email-already-in-use)."){
        alert("Correo en uso")
      } else if(errorMessage == "Firebase: Error (auth/invalid-email)."){
        alert("Correo no válido")
      } else {
        alert(errorMessage);
      }
  });
}

async function addUser(user) {
  const ref = doc(db, 'usuarios', user.uid);
  await setDoc(ref, user);
  await (window.location.href="../../index.html");
}

document.getElementById("createAccount").addEventListener("click", () => {
  registrar();
});

