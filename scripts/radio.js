import {
  buscador_gasolineras,
  buscadorInformacionGasolinera,
  presentadorGasolineras,
} from "./gasolineras.js";

var circle = null;
export async function mostrarRatio(map, markers, iconGas, radio) {
  var marks = L.layerGroup().addTo(map);
  //eliminamos el circulo dibujado
  if (circle) {
    map.removeLayer(circle);
  }
  
  //Mostrar gasolineras en ratio
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
      var ubicacionCoords = [parseFloat(data[0].lat), parseFloat(data[0].lon)]; //Coordenadas de la ubicación

      console.log(ubicacionCoords);

      //ELiminar marcadores
      marks.clearLayers();

      // Actualizar el círculo en el mapa
      if (circle) {
        map.removeLayer(circle);
      }
      circle = L.circle(ubicacionCoords, {
        radius: radio * 1000, // radio en metros
        color: "blue", // color del borde
        fillColor: "#3388ff", // color de relleno
        fillOpacity: 0.2, // opacidad del relleno
      }).addTo(map);

      // Llamar a la función para mostrar las gasolineras dentro del radio
      buscador_gasolineras(radio, ubicacionCoords).then(function (result) {
        console.log("Longitud: " + ubicacionCoords[0]);
        presentadorGasolineras(markers, result, map, iconGas);
        buscadorInformacionGasolinera(result);
      });
    });
}
