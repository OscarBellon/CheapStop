import { buscadorInformacionGasolinera } from "./gasolineras.js";
import { buscador_gasolineras } from "./gasolineras.js";
import { presentadorGasolineras } from "./gasolineras.js";
//import { mostrarRatio } from "./radio.js";
import {busquedaOrigenDestino} from "./rutas.js";
import { busacdorRuta } from "./rutas.js";
import { pushMarcadorInformacion } from "./gasolineras.js";
import { sortGasolineras } from "./listas.js";
import { clearListaGasolineras } from "./listas.js";


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
var radio=null;
localStorage.setItem('radio',radio);

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


function mostrarRatio(map, markers, iconGas) {
  //Variables necesarias para mostrar las gasolineras dentro de un ratio
  var circle = null;
  var marks = L.layerGroup().addTo(map);
  console.log("Entro a mostrarRaio");
  var radio = Number(localStorage.getItem('radio'));
  
  if(isNaN(radio)) {
    radio = 2800;
  }
  console.log(radio);

  //Mostrar gasolineras en ratio
  //document
  //  .getElementById("ubicacion")
  //  .addEventListener("keypress", function (e) {
  //    if (e.keyCode === 13) {
  //      e.preventDefault(); //Prevenir el envio del formulario

        borrarMierdaDelMapa(markers,baseLayer);

        /*for (let j = 0; j < markers.length; j++) {
          map.removeLayer(markers[j]);
        };
        map.eachLayer((layer) => {
          if (layer !== baseLayer) {
            map.removeLayer(layer);
          }
        });*/
        

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
              radius: radio, // radio en metros
              color: "blue", // color del borde
              fillColor: "#3388ff", // color de relleno
              fillOpacity: 0.2, // opacidad del relleno
              interactive: false
            }).addTo(map);

            //El mapa se ajusta a la busqueda realizada 
            map.flyToBounds(circle.getBounds(), {duration: 1});

            // Llamar a la función para mostrar las gasolineras dentro del radio
            buscador_gasolineras(radio, ubicacionCoords).then(function (result) {
              console.log("Longitud: " + ubicacionCoords[0]);
              buscadorInformacionGasolinera(result).then((info) => {
                console.log(info);
                listaGasolineras = [];
                info.forEach((gasolinera) => {
                  console.log(gasolinera);
                  pushMarcadorInformacion( markers, gasolinera, map, iconGas, listaGasolineras);
                });
              });
            });
          });
      }