import { buscadorInformacionGasolinera } from "./gasolineras.js";
import { buscador_gasolineras } from "./gasolineras.js";
import { presentadorGasolineras } from "./gasolineras.js";
import { mostrarRatio } from "./radio.js";
import {busquedaOrigenDestino} from "./rutas.js";
import { busacdorRuta } from "./rutas.js";
import { pushMarcadorInformacion } from "./gasolineras.js";
import { sortGasolineras } from "./listas.js";
import { clearListaGasolineras } from "./listas.js";
import { getGasolineraInfo } from "./fireStore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { translate } from './translate.js'
//Icono para gasolineras
var iconGas = new L.icon({
  //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  iconUrl: 'logo.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

//Inicializar el mapa
var map = L.map("map").setView([28.09973, -15.41343], 10);

//Agregar el mapa
export const baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

//Variable que va a contener el radio del slider
var radio = localStorage.getItem('radio');
if (!localStorage.getItem('radio')) {
  localStorage.setItem('radio', 2800);
}
console.log("RADIO ESCOGIDO "+radio)
//Crear capa de gasolineras vacia para agregar gasolineras encontradas
var gasLayer = L.layerGroup().addTo(map);

//Lista de marcadores
var markers = [];
var listaGasolineras=[];

var switchListaGasolineras=false;
document.getElementById("gasolineraLista").addEventListener("click",function () {
  if(!switchListaGasolineras){
    sortGasolineras(listaGasolineras);
    switchListaGasolineras=true;
  }
  else{
    clearListaGasolineras()
    switchListaGasolineras=false;
  }
  
})

//Envio del formulario de busqueda de gasolineras
document
  .getElementById("destination")
  .addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault(); //Prevenir el envio del formulario

      rutaActualizada(radio);

    }
});
  
export function borrarMierdaDelMapa(marcadores, layerBase){
  for (let j = 0; j < marcadores.length; j++) {
    map.removeLayer(markers[j]);
  }
  map.eachLayer((layer) => {
    if (layer !== layerBase) {
      map.removeLayer(layer);
    }
  });

}

document
  .getElementById("ubicacion")
  .addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault(); //Prevenir el envio del formulario

      mostrarRatio(map, markers, iconGas);

    }
});


function rutaActualizada(radio){
    var origin = document.getElementById("origin").value;
    var destination = document.getElementById("destination").value;

    if(radio===null){
      radio=2800;
    }

    borrarMierdaDelMapa(markers,baseLayer);

    //console.log("GOL DE LA UDE");
    busquedaOrigenDestino(origin,destination)
    .then(function (result){
      //console.log(result);
      busacdorRuta(result[0],result[1])
    .then(function (ruta){
      var rutaGasofa = L.polyline(ruta,{color: 'blue'}).addTo(map);
      buscador_gasolineras(radio,ruta).then(function (result) {
        buscadorInformacionGasolinera(result,markers,map,iconGas,listaGasolineras)
        /*result.forEach(gasolinera => {
          //console.log(gasolinera)
          let coordGasolinera=gasolinera.split(",")
            for (let i = 0; i < coordGasolinera.length; i++) {
                var valorRedondeado= parseFloat(coordGasolinera[i]).toFixed(3);
                coordGasolinera[i] = valorRedondeado;
            }
          //console.log(coordGasolinera)
          let idgasolinera = coordGasolinera[1]+";"+coordGasolinera[0]
          console.log(idgasolinera)
          getGasolineraInfo(idgasolinera)
        });*/
        /*buscadorInformacionGasolinera(result).then(info =>{
          console.log(info)
          listaGasolineras=[];
          info.forEach(gasolinera =>{
          console.log(gasolinera);                  
          pushMarcadorInformacion(markers,gasolinera,map,iconGas,listaGasolineras);
        })
      })*/
      })
      //El mapa se ajusta a la ruta
      map.flyToBounds(rutaGasofa.getBounds(), {duration: 1});
    })
  })
}

document.getElementById("icono-menu").addEventListener("click", function () {
  document.getElementById("botones-container").style.display = "none";
  document.getElementById("slider-container").style.display = "none";
  var dropdownMenu = document.getElementById("menu-desplegable");
  if (dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
});


document.body.addEventListener('mouseup', () => {
  
  document.getElementById("botones-container").addEventListener("click", () => {
    console.log("1");
  });
  
});  

document.getElementById("combustible").addEventListener("click", () => {
  document.getElementById("botones-container").style.display = "flex";
  document.getElementById("menu-desplegable").style.display="none";
});

document.getElementById("radio").addEventListener("click", () => {
  document.getElementById("slider-container").style.display = "flex";
  document.getElementById("menu-desplegable").style.display="none";
});
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('customRange3').addEventListener('change', function() {
    radio=this.value*1000;
    //console.log(radio);
    localStorage.setItem('radio',radio);
    let elemento=document.getElementById("barraRuta");
    let estiloElemeto=window.getComputedStyle(elemento);
    if(estiloElemeto.display === 'none'){
      //mostrarRatioActualizado(map, markers, iconGas, radio);
      mostrarRatio(map,markers,iconGas);
    }else{
      rutaActualizada(radio);
    }
    console.log(localStorage.getItem('radio'));
  
    });
});
document.getElementById("rangevalue").innerHTML = localStorage.getItem('radio')/1000 + "Km";
document.getElementById('customRange3').value = parseFloat(localStorage.getItem('radio')/1000)
document.getElementById("icono-usuario").addEventListener("click", function () {
  //document.getElementById("botones-container").style.display = "none";
  //document.getElementById("slider-container").style.display = "none";
  var dropdownMenu = document.getElementById("usuario-desplegable");
  if (dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
});

const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const usuarioDesplegable = document.getElementById('usuario-desplegable');

    if (user) {
      // Usuario logeado
      usuarioDesplegable.innerHTML = `
        <ul>
          <li id="perfil">Perfil</li>
          <li id="preferencias">Preferencias</li>
          <li id="logout">Cerrar sesión</li>
          <li id="login" style="display:none">Iniciar sesión</li>
					<li id="registro" style="display:none">Registrarse</li>
        </ul>
      `;
      translate(localStorage.getItem('language'));
      document.getElementById("logout").addEventListener('click', () => {
        auth.signOut()
        .then(() => { 
          localStorage.setItem('radio', 2800)
          localStorage.setItem('combustible', 0)
          window.location.href="./index.html"; 
        })
        .catch(error => {console.error(error);})
      })
      document.getElementById("preferencias").addEventListener("click", function(){
        window.location.href="/Componentes/Sesion/preferencias.html";
      });
    
      document.getElementById("perfil").addEventListener("click", function(){
        window.location.href="/Componentes/Sesion/perfil.html";
      });
    } else {
      // Usuario no logeado
      usuarioDesplegable.innerHTML = `
        <ul>
          <li id="login">Iniciar sesión</li>
          <li id="registro">Registrarse</li>
        </ul>
      `;
      translate(localStorage.getItem('language'));
      document.getElementById("registro").addEventListener("click", function(){
        window.location.href="/Componentes/Sesion/formularioDeRegistro.html";
      });
    
      document.getElementById("login").addEventListener("click", function(){
        window.location.href="/Componentes/Sesion/formularioDeLogin.html";
      });
    }
  
    usuarioDesplegable.style.display = 'block';
  });