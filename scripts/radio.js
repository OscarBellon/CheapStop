import { buscador_gasolineras, buscadorInformacionGasolinera, presentadorGasolineras} from "./gasolineras.js";
import { baseLayer, borrarMierdaDelMapa } from "./script.js";


export async function mostrarRatio(map, markers, iconGas) {
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
            }).addTo(map);

            //El mapa se ajusta a la busqueda realizada 
            map.flyToBounds(circle.getBounds(), {duration: 1});

            // Llamar a la función para mostrar las gasolineras dentro del radio
            buscador_gasolineras(radio, ubicacionCoords).then(function (result) {
              console.log("Longitud: " + ubicacionCoords[0]);
              presentadorGasolineras(markers, result, map, iconGas);
              buscadorInformacionGasolinera(result);
            });
          });
      }
//    });
//}


/*export async function mostrarRatioActualizado(map, markers, iconGas, radio) {

  var circle = null;
  var marks = L.layerGroup().addTo(map);

  borrarMierdaDelMapa(markers, baseLayer);

  /*for (let j = 0; j < markers.length; j++) {
    map.removeLayer(markers[j]);
  };
  map.eachLayer((layer) => {
    if (layer !== baseLayer) {
      map.removeLayer(layer);
    }
  });*/

  /*var ubicacion = document.getElementById("ubicacion").value;

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
            }).addTo(map);

            //El mapa se ajusta a la busqueda realizada 
            map.flyToBounds(circle.getBounds(), {duration: 1});

            // Llamar a la función para mostrar las gasolineras dentro del radio
            buscador_gasolineras(radio, ubicacionCoords).then(function (result) {
              console.log("Longitud: " + ubicacionCoords[0]);
              presentadorGasolineras(markers, result, map, iconGas);
              buscadorInformacionGasolinera(result);
            });
          });

}*/
