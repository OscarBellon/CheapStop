export async function buscador_gasolineras(radio, coords) {
    
    let setGasolineras = new Set()
    var fetches=[];
    
    for (let i=0; i<coords.length;i++){
        //Seleccionamos la URL en funcion de si se define para una ruta o para una única ubicación
        var fetchUrl = coords.length > 2 ? "https://api.geoapify.com/v2/places?categories=service.vehicle.fuel&filter=circle:"+String(coords[i][1])+","+String(coords[i][0])+","+String(radio)+"&bias=proximity:"+String(coords[i][1])+","+String(coords[i][0])+"&limit=20&apiKey=5defe68cc4dc4bffb53b9cc477f721f5" 
        : `https://api.geoapify.com/v2/places?categories=service.vehicle.fuel&filter=circle:${coords[1]},${coords[0]},${radio}&limit=20&apiKey=5defe68cc4dc4bffb53b9cc477f721f5`;
        fetches.push(
        fetch(fetchUrl)
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

 
export function presentadorGasolineras(markers,gasolineras,map, iconGas) {
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