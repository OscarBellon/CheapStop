import { buscadorInformacionGasolinera } from "./gasolineras.js";
import { buscador_gasolineras } from "./gasolineras.js";
import { presentadorGasolineras } from "./gasolineras.js";
import { mostrarGasolinerasEnRadio } from "./gasolineras.js";
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

      //console.log(origin);
      //console.log(destination);

      for (let j = 0; j < markers.length; j++) {
        map.removeLayer(markers[j]);
      }

      //Obtener los valores de los campos del formulario
      //var gasType = document.getElementById("gas-type").value;
      //var origin=document.getElementById('origin').value;
      //var destination=document.getElementById('destination').value;

      //Obtener las coordenadas de origen y destino utilizando la API de OpenStreetMap
      //var url = 'https://nominatim.openstreetmap.org/search?q=' + origin + ',' + destination + '&format=json';
      var origen_url =
        "https://nominatim.openstreetmap.org/search.php?q=" +
        origin +
        "&format=jsonv2";
      fetch(origen_url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var originCoords = [parseFloat(data[0].lat), parseFloat(data[0].lon)]; //Coordenadas origen

          console.log(originCoords);

          var destino_url =
            "https://nominatim.openstreetmap.org/search.php?q=" +
            destination +
            "&format=jsonv2";
          fetch(destino_url)
            .then(function (response) {
              return response.json();
            })
            .then(function (data2) {
              var destinationCoords = [
                parseFloat(data2[0].lat),
                parseFloat(data2[0].lon),
              ]; //Coordenadas destino
              console.log(destinationCoords);
              //Obtener la ruta utilizando la API de OpenRouteService
              //var routeURL = 'https://api.openrouteservice.org/v2/directions/driving-car?start=' + originCoords[1] + ',' + originCoords[0] + '&end=' + destinationCoords[1] + ',' + destinationCoords[0] + '&api_key=<5b3ce3597851110001cf6248ec6cc375881a440db695f6f2fb789576>';
              var routeURL =
                "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248ec6cc375881a440db695f6f2fb789576&start=" +
                originCoords[1] +
                "," +
                originCoords[0] +
                "&end=" +
                destinationCoords[1] +
                "," +
                destinationCoords[0];
              fetch(routeURL)
                .then(function (response) {
                  return response.json();
                })
                .then(function (data3) {
                  //Obtener las coordenadas de los puntos de la ruta
                  var coords = data3.features[0].geometry.coordinates.map(
                    function (coord) {
                      console.log(coord[1], coord[0]);
                      return [coord[1], coord[0]];
                    }
                  );

                  for (let i = 0; i < coords.length; i++) {
                    //var marker=L.marker([coords[i][0],coords[i][1]]).addTo(map);
                    if (i == 0 || i == coords.length - 1) {
                      markers.push(
                        L.marker([coords[i][0], coords[i][1]]).addTo(map)
                      );
                    } else {
                      markers.push(
                        L.circleMarker([coords[i][0], coords[i][1]], {
                          radius: 5,
                        }).addTo(map)
                      );
                    }
                  }

                  buscador_gasolineras(500, coords).then(function (result) {
                    /*result.forEach(element => {
                                let coordGasolinera = element.split(",");
                                console.log(coordGasolinera);
                                markers.push(L.marker([parseFloat(coordGasolinera[1]),parseFloat(coordGasolinera[0])]).addTo(map));
                            });*/
                    presentadorGasolineras(markers, result, map, iconGas);
                    buscadorInformacionGasolinera(result);
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
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



