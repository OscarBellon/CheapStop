import { buscadorInformacionGasolinera } from "./gasolineras.js";
import { buscador_gasolineras } from "./gasolineras.js";
import { presentadorGasolineras } from "./gasolineras.js";
import { mostrarGasolinerasEnRadio } from "./gasolineras.js";
import {busquedaOrigenDestino} from "./rutas.js";
import { busacdorRuta } from "./rutas.js";
import { mostrarRatio } from "./radio.js";
//Icono para gasolineras
var iconGas = new L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

//Inicializar el mapa
var map = L.map("map").setView([28.09973, -15.41343], 10);

//Agregar el mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

//Crear capa de gasolineras vacia para agregar gasolineras encontradas
var gasLayer = L.layerGroup().addTo(map);

//Lista de marcadores
var markers = [];
//Envio del formulario de busqueda de gasolineras
document
  .getElementById("destination")
  .addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault(); //Prevenir el envio del formulario

      var origin = document.getElementById("origin").value;
      var destination = document.getElementById("destination").value;

      for (let j = 0; j < markers.length; j++) {
        map.removeLayer(markers[j]);
      }

      busquedaOrigenDestino(origin,destination)
      .then(function (result){
        console.log(result);
        busacdorRuta(result[0],result[1])
        .then(function (ruta){
            L.polyline(ruta,{color: 'blue'}).addTo(map);
            buscador_gasolineras(500,ruta).then(function (result) {
                presentadorGasolineras(markers, result,map,iconGas);
            })
        })
      })

    }
  });

mostrarRatio(map, markers, iconGas);

//Eliminar marcadores al cambiar de pagina
document.getElementById("volver").addEventListener("click", function (e){
  for (let j = 0; j < markers.length; j++) {
    map.removeLayer(markers[j]);
  };
});

document.getElementById("ruta").addEventListener("click", function (e){
  if (circle) {
    map.removeLayer(circle);
  }
  marks.clearLayers();
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



