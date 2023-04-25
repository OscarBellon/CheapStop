import { buscadorInformacionGasolinera } from "./gasolineras.js";
import { buscador_gasolineras } from "./gasolineras.js";
import { presentadorGasolineras } from "./gasolineras.js";
import { mostrarRatio, mostrarRatioActualizado } from "./radio.js";
import {busquedaOrigenDestino} from "./rutas.js";
import { busacdorRuta } from "./rutas.js";
import { pushMarcadorInformacion } from "./gasolineras.js";
import { sortGasolineras } from "./listas.js";

//Icono para gasolineras
var iconGas = new L.icon({
  //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  iconUrl: 'logo.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
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
var radio=null;

//Crear capa de gasolineras vacia para agregar gasolineras encontradas
var gasLayer = L.layerGroup().addTo(map);

//Lista de marcadores
var markers = [];
var listaGasolineras=[];

document.getElementById("gasolineraLista").addEventListener("click",function () {
  sortGasolineras(listaGasolineras)
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

mostrarRatio(map, markers, iconGas);

function rutaActualizada(radio){
    var origin = document.getElementById("origin").value;
    var destination = document.getElementById("destination").value;

    if(radio===null){
      radio=500;
    }

    borrarMierdaDelMapa(markers,baseLayer);

    //console.log("GOL DE LA UDE");
    busquedaOrigenDestino(origin,destination)
    .then(function (result){
      console.log(result);
      busacdorRuta(result[0],result[1])
    .then(function (ruta){
      var rutaGasofa = L.polyline(ruta,{color: 'blue'}).addTo(map);
      buscador_gasolineras(radio,ruta).then(function (result) {

        buscadorInformacionGasolinera(result).then(info =>{
            console.log(info)
            listaGasolineras=[];
            info.forEach(gasolinera =>{
            console.log(gasolinera);                  
            pushMarcadorInformacion(markers,gasolinera,map,iconGas,listaGasolineras);
          })
        })
      })
      //El mapa se ajusta a la ruta
      map.flyToBounds(rutaGasofa.getBounds(), {duration: 1});
      })
    })
}

//Eliminar marcadores al cambiar de pagina
document.getElementById("volver").addEventListener("click", function (e){
  /*for (let j = 0; j < markers.length; j++) {
    map.removeLayer(markers[j]);
  };
  map.eachLayer((layer) => {
    if (layer !== baseLayer) {
      map.removeLayer(layer);
    }
  });*/
  console.log("LoL xd");
  //borrarMierdaDelMapa(markers,baseLayer);
});

document.getElementById("ruta").addEventListener("click", function (e){
  /*map.eachLayer((layer) => {
    if (layer !== baseLayer) {
      map.removeLayer(layer);
    }
  });
  console.log("Pene");*/
  //borrarMierdaDelMapa(markers,baseLayer);
});

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

document.getElementById('customRange3').addEventListener('change', function() {
  radio=this.value*1000;
  //console.log(radio);
  let elemento=document.getElementById("barraRuta");
  let estiloElemeto=window.getComputedStyle(elemento);
  if(estiloElemeto.display === 'none'){
    mostrarRatioActualizado(map, markers, iconGas, radio);
  }else{
    rutaActualizada(radio);
  }
  
});



