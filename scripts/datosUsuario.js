<<<<<<< HEAD
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

const auth = getAuth();

onAuthStateChanged(auth, async (user) =>{
  if(user){
  const ref = doc(db, 'usuarios', user?.uid)
  const currentUser = await getDoc(ref, user);
    nombrePersona.innerText = currentUser.data().nombre;
    emailPersonma.innerText = currentUser.data().email;
  }
=======
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

const auth = getAuth();

onAuthStateChanged(auth, async (user) =>{
  if(user){
  const ref = doc(db, 'usuarios', user?.uid)
  const currentUser = await getDoc(ref, user);
    nombrePersona.innerText = currentUser.data().nombre;
    emailPersonma.innerText = currentUser.data().email;
  }
>>>>>>> main
})