export async function buscador_gasolineras(radio, coords) {
    
    let setGasolineras = new Set()
    var fetches=[];
    for (let i=0; i<coords.length;i++){
        fetches.push(
        fetch("https://api.geoapify.com/v2/places?categories=service.vehicle.fuel&filter=circle:"+String(coords[i][1])+","+String(coords[i][0])+","+String(radio)+"&bias=proximity:"+String(coords[i][1])+","+String(coords[i][0])+"&limit=20&apiKey=5defe68cc4dc4bffb53b9cc477f721f5")
        .then(result => result.json())
        .then(featureCollection =>{
            //console.log(featureCollection)
            featureCollection.features.forEach(element => {
                setGasolineras.add(element.geometry.coordinates.toString())
            });
        })
        .catch(error => console.log('error', error))
        );
    }
    return Promise.all(fetches).then(function () {
        return setGasolineras
        
    })
}

 
export function presentadorGasolineras(markers,gasolineras,map) {
    var iconGas = new L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
    gasolineras.forEach(element => {
        let coordGasolinera = element.split(",");
        console.log(coordGasolinera);
        markers.push(L.marker([parseFloat(coordGasolinera[1]),parseFloat(coordGasolinera[0])],{icon: iconGas}).addTo(map));
    });    
}

export function buscadorInformacionGasolinera(gasolineras){
    fetch("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/")
    .then(result=>result.json())
    .then(res =>{
        var coleccionInformacionGasolineras=[]
        console.log(res.ListaEESSPrecio[0]["Longitud (WGS84)"]);
        gasolineras.forEach(gasolinera => {
            let coordGasolinera=gasolinera.split(",")
            for (let i = 0; i < coordGasolinera.length; i++) {
                var valorRedondeado= parseFloat(coordGasolinera[i]).toFixed(3);
                coordGasolinera[i] = valorRedondeado;
            }
            coleccionInformacionGasolineras.push(res.ListaEESSPrecio
                    .filter(gasolinera=> parseFloat(gasolinera.Latitud.replace(",",".")).toFixed(3)==coordGasolinera[1] &&  parseFloat(gasolinera["Longitud (WGS84)"].replace(",",".")).toFixed(3)==coordGasolinera[0]));
        });

        console.log(coleccionInformacionGasolineras);
        return coleccionInformacionGasolineras;
        //console.log(res.ListaEESSPrecio
        //    .filter(gasolinera=> gasolinera.Latitud==latitud || gasolinera["Longitud (WGS84)"]==longitud));
    })
        
    

}

export async function mostrarGasolinerasEnRadio(radio, ubicacionCoords) {
    // Obtener las gasolineras cercanas utilizando la API de geoapify
    const response = await fetch(`https://api.geoapify.com/v2/places?categories=service.vehicle.fuel&filter=circle:${ubicacionCoords[1]},${ubicacionCoords[0]},${radio}&limit=20&apiKey=5defe68cc4dc4bffb53b9cc477f721f5`);
    const data = await response.json();
  
    // Crear un array de objetos con las coordenadas y la información relevante de cada gasolinera
    const gasolinerasEnRadio = [];
    data.features.forEach(function(gasolinera) {
      const gasolineraCoords = gasolinera.geometry.coordinates;
      const distancia = L.latLng(ubicacionCoords).distanceTo(gasolineraCoords.reverse());
      if (distancia <= radio) {
        gasolinerasEnRadio.push({
          latlng: gasolineraCoords.reverse(),
          name: gasolinera.properties.name,
          address: gasolinera.properties.formatted_address
        });
      }
    });
    
    // Devolver el array de objetos con las coordenadas y la información relevante de cada gasolinera
    return gasolinerasEnRadio;
  }
