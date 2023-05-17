
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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
var currentUser = "";
onAuthStateChanged(auth, async (user) =>{
  if(user){
  const ref = doc(db, 'usuarios', user?.uid)
  currentUser = await getDoc(ref, user);
}
})

const selectRadio = document.getElementById('radioSelLabel');



selectRadio.addEventListener('change', (event) => {
    const selected = event.target.value;
    const userRef = doc(db, 'usuarios', currentUser.data().uid);
  updateDoc(userRef, {
    radio: selected
  })
    .then(() => {
      localStorage.setItem('radio',selected);
      console.log('Opción guardada en la base de datos' + currentUser.data().radio );
    })
    .catch((error) => {
      console.error('Error al guardar la opción en la base de datos:', error);
    });
});
//Para que se muestre el radio seleccionado
for (var i = 0; i < selectRadio.options.length; i++) {
  if (selectRadio.options[i].value === localStorage.getItem('radio')) {
    selectRadio.options[i].selected = true;
    break; 
  }
}

const selectFuel = document.getElementById('carburanteSelLabel');

selectFuel.addEventListener('change', (event) => {
    const selected = event.target.value;
    const userRef = doc(db, 'usuarios', currentUser.data().uid);
  updateDoc(userRef, {
    combustible: selected
  })
    .then(() => {
      localStorage.setItem('combustible', selected)
      console.log('Opción guardada en la base de datos ' + currentUser.data().combustible);
    })
    .catch((error) => {
      console.error('Error al guardar la opción en la base de datos:', error);
    });
});

//Para que se muestre el combustible seleccionado
for (var i = 0; i < selectFuel.options.length; i++) {
  if (selectFuel.options[i].value === localStorage.getItem('combustible')) {
    selectFuel.options[i].selected = true;
    break; 
  }
}

const selectLanguage = document.getElementById('idiomaSelLabel');
selectLanguage.addEventListener('change', (event) => {
    const selected = event.target.value;
    const userRef = doc(db, 'usuarios', currentUser.data().uid);
  updateDoc(userRef, {
    idioma: selected
  })
  .then(async () => {
    localStorage.setItem('language', selected)
    console.log('Opción guardada en la base de datos');
    })
    .catch((error) => {
      console.error('Error al guardar la opción en la base de datos:', error);
    });
}); 
//Para que se muestre el idioma seleccionado
for (var i = 0; i < selectLanguage.options.length; i++) {
  if (selectLanguage.options[i].value === localStorage.getItem('language')) {
    selectLanguage.options[i].selected = true;
    break; 
  }
}