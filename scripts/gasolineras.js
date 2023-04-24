let combustible = [
    "Precio Gasolina 95 E5",
    "Precio Gasolina 98 E5",
    "Precio Gasoleo A",
    "Precio Gasoleo Premium"
]
let combustibleIndice = 0;

document.getElementById("diesel").addEventListener("click", function () {
    combustibleIndice=2;
    console.log("diesel")
});
document.getElementById("gasolina95").addEventListener("click", function () {
    combustibleIndice=0;
    console.log("95")
});
document.getElementById("dieselplus").addEventListener("click", function () {
    combustibleIndice=3;
    console.log("pl")
});
document.getElementById("gasolina98").addEventListener("click", function () {
    combustibleIndice=1;
    console.log("98")
});



export async function buscador_gasolineras(radio, coords) {
    
    let setGasolineras = new Set()
    var fetches=[];
    radio = radio*1000;
    console.log("Valo ratio en buscador_gasolineras: " + radio);
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

export function pushMarcadorInformacion(markers,infoGasolinera,map,iconGas,listaGasolineras) {
    fetch("/Componentes\\gasolinera/gasolinera.html").then(html => {
       return html.text()
    })
    .then(content=>{
        let marcador = L.marker([parseFloat(infoGasolinera.Latitud.replace(",",".")),parseFloat(infoGasolinera["Longitud (WGS84)"].replace(",","."))],{icon: iconGas});
        var parser = new DOMParser();
        let doc = parser.parseFromString(content, 'text/html');
        doc.getElementById("gasNombre").textContent = infoGasolinera["Rótulo"];
        doc.getElementById("precioGasolina").textContent = infoGasolinera[combustible[combustibleIndice]] + " €";
        let cont= doc.querySelector("html").innerHTML


        let gasolinera={gasNombre: infoGasolinera["Rótulo"],gasPrecio:infoGasolinera[combustible[combustibleIndice]]}
        marcador.bindPopup(cont,{minWidth: 500}).openPopup();
        listaGasolineras.push(gasolinera);
        
        markers.push(marcador.addTo(map));
    })
    
}

export function  buscadorInformacionGasolinera(gasolineras){
    return fetch("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/")
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
                    .filter(gasolinera=> parseFloat(gasolinera.Latitud.replace(",",".")).toFixed(3)==coordGasolinera[1]
                     &&  parseFloat(gasolinera["Longitud (WGS84)"].replace(",",".")).toFixed(3)==coordGasolinera[0])[0]);
        });
        coleccionInformacionGasolineras=coleccionInformacionGasolineras.filter(item=>item);
        return coleccionInformacionGasolineras;
        //console.log(res.ListaEESSPrecio
        //    .filter(gasolinera=> gasolinera.Latitud==latitud || gasolinera["Longitud (WGS84)"]==longitud));
    })
        
    

}