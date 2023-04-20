import { buscadorInformacionGasolinera } from "./gasolineras.js";
import { buscador_gasolineras } from "./gasolineras.js";
import { presentadorGasolineras } from "./gasolineras.js";
import { mostrarGasolinerasEnRadio } from "./gasolineras.js";
import {busquedaOrigenDestino} from "./rutas.js";
import { busacdorRuta } from "./rutas.js";

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
  


//Variables necesarias para mostrar las gasolineras dentro de un ratio
var circle = null;
var marks = L.layerGroup().addTo(map);

//Mostrar gasolineras en ratio
document.getElementById("ubicacion").addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault(); //Prevenir el envio del formulario

    var ubicacion = document.getElementById("ubicacion").value;

    //Obtener las coordenadas de la ubicación utilizando la API de OpenStreetMap
    var ubicacion_url =
      "https://nominatim.openstreetmap.org/search.php?q=" +
      ubicacion +
      "&format=jsonv2";
    fetch(ubicacion_url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var ubicacionCoords = [
          parseFloat(data[0].lat),
          parseFloat(data[0].lon),
        ]; //Coordenadas de la ubicación

        console.log(ubicacionCoords);

        //ELiminar marcadores
        marks.clearLayers();

        // Actualizar el círculo en el mapa
        if (circle) {
          map.removeLayer(circle);
        }
        circle = L.circle(ubicacionCoords, {
          radius: 500, // radio en metros
          color: "blue", // color del borde
          fillColor: "#3388ff", // color de relleno
          fillOpacity: 0.2, // opacidad del relleno
        }).addTo(map);

        // Llamar a la función para obtener las gasolineras dentro del radio y agregar cada marcador a la capa
        mostrarGasolinerasEnRadio(500, ubicacionCoords).then(function (
          gasolineras
        ) {
          for (let i = 0; i < gasolineras.length; i++) {
            const gasolinera = gasolineras[i];
            console.log(gasolinera);
            marks.addLayer(
              L.marker([
                parseFloat(gasolinera.latlng[1]).toFixed(3),
                parseFloat(gasolinera.latlng[0]).toFixed(3)
                ],{icon: iconGas}).addTo(map)
            );
          }
        });
      });
  }
});

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



