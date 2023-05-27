import { getAuth, deleteUser, EmailAuthProvider, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

async function cambiarContrasena() {
    const contrasenaActualInput = document.getElementById('contraseñaActual');
    const nuevaContrasenaInput = document.getElementById('nuevaContraseña');
    const confirmarContrasenaInput = document.getElementById('confirmarContraseña');
    const user = auth.currentUser;
    console.log(nuevaContrasenaInput.value);
    // Comprobación de las contraseñas
    if (nuevaContrasenaInput.value !== confirmarContrasenaInput.value) {
        alert("Las contraseñas no coinciden");
        return;
    }
    const credential = EmailAuthProvider.credential(user.email, contrasenaActualInput.value);
    console.log(credential);

    try {
        // Reautenticar al usuario
        await signInWithEmailAndPassword(auth, user.email, contrasenaActualInput.value);
        await updatePassword(user, nuevaContrasenaInput.value);
        alert('Contraseña actualizada con éxito');
    } catch (error) {
        alert('Error al iniciar: ' + error.message);
    }
    /*
    try {
        reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
            try {
            updatePassword(user, nuevaContrasenaInput);
            alert('Contraseña actualizada con éxito');
            } catch (error) {
                alert('No actualiza:'  + error.message);
            }
          }).catch((error) => {
            // An error ocurred
            // ...
            alert('No esta reautenticado:'  + error.message);
          });
    } catch (error) {
        alert('Error al cambiar la contraseña: ' + error.message);
    }*/
    window.location.href="../../../index.html";
}

async function papa(){
    console.log("david");
}
async function eliminarCuenta() {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
        alert("La cuenta ha sido eliminada con éxito");
        window.location.replace("../../../index.html");
    }).catch((error) => {
        alert("Error al eliminar la cuenta:" + error);
    });
}
document.getElementById('eliminarCuenta').addEventListener('click',eliminarCuenta);
document.getElementById('guardar').addEventListener('click',cambiarContrasena);