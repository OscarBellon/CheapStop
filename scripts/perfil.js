import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { EmailAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
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
    const contrasenaActualInput = document.getElementById('contrasenaActual');
    const nuevaContrasenaInput = document.getElementById('nuevaContrasena');
    const confirmarContrasenaInput = document.getElementById('confirmarContrasena');

    // Comprobación de las contraseñas
    if (nuevaContrasenaInput.value !== confirmarContrasenaInput.value) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Reautenticación del usuario
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
        user.email, 
        contrasenaActualInput.value
    );

    try {
        await user.reauthenticateWithCredential(credential);
    } catch (error) {
        console.log(error);
        alert("La contraseña actual es incorrecta");
        return;
    }

    // Cambio de la contraseña
    try {
        await user.updatePassword(nuevaContrasenaInput.value);
        alert("Contraseña cambiada con éxito");
    } catch (error) {
        alert("Error al cambiar la contraseña");
    }
}

async function eliminarCuenta() {
    const user = auth.currentUser;

    try {
        await user.delete();
        alert("La cuenta ha sido eliminada con éxito");
        window.location.href("../../../index.html");
    } catch (error) {
        alert("Error al eliminar la cuenta");
    }
}
document.getElementById('eliminarCuenta').addEventListener('click',eliminarCuenta);
document.getElementById('guardar').addEventListener('click', cambiarContrasena);