import { getGasolineraInfo } from "./fireStore.js";
import { getLanguage, updateNodes, translateCards} from "./translate.js";

let combustible = [
    "Gasolina95E5",
    "Gasolina98E5",
    "Gasoleo",
    "GasoleoPlus"
]
let combustibleIndice = 0;

document.getElementById("diesel").addEventListener("click", function () {
    combustibleIndice=2;
    console.log("diesel")
    cambioEstadoBotonesGasolina(combustibleIndice)
});
document.getElementById("gasolina95").addEventListener("click", function () {
    combustibleIndice=0;
    console.log("95")
    cambioEstadoBotonesGasolina(combustibleIndice)
});
document.getElementById("dieselplus").addEventListener("click", function () {
    combustibleIndice=3;
    console.log("pl")
    cambioEstadoBotonesGasolina(combustibleIndice)
});
document.getElementById("gasolina98").addEventListener("click", function () {
    combustibleIndice=1;
    console.log("98")
    cambioEstadoBotonesGasolina(combustibleIndice)
});

//Para que el que aparezca seleccionado sea la 95
document.getElementById("gasolina98").style.backgroundColor="#093E8B";
document.getElementById("diesel").style.backgroundColor="#093E8B";
document.getElementById("dieselplus").style.backgroundColor="#093E8B";

function cambioEstadoBotonesGasolina(combustibleActivo) {
    const botones=["gasolina95","gasolina98","diesel","dieselplus"];
    for (let i = 0; i < botones.length; i++) {
        if(i==combustibleActivo){
            document.getElementById(botones[i]).style.backgroundColor= "#0B4EAE";
        }
        else{
            document.getElementById(botones[i]).style.backgroundColor="#093E8B";
        }
        
    }
}

export async function buscador_gasolineras(radio, coords) {
    
    let setGasolineras = new Set()
    var fetches=[];

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
    fetch("/Componentes/Gasolinera/gasolinera.html").then(html => {
       return html.text()
    })
    .then(content=>{
        
        console.log(infoGasolinera)
        let marcador = L.marker([infoGasolinera.Latitud,infoGasolinera.Longitud],{icon: iconGas});
        var parser = new DOMParser();
        let doc = parser.parseFromString(content, 'text/html');
        doc.getElementById("gasNombre").textContent = infoGasolinera["Rotulo"];
        doc.getElementById("precioGasolina").textContent = infoGasolinera[combustible[combustibleIndice]] + " €";
        doc.getElementById("maps").href=ParsearUbcicacion(infoGasolinera["Direccion"],infoGasolinera["C.P."]);
        doc.getElementById("tipoGasolinaTexto").textContent=combustible[combustibleIndice];
        doc.getElementById("horarioGasolinera").textContent=infoGasolinera.Horario;
        let cont= doc.querySelector("html").innerHTML
        let gasolinera={gasNombre: infoGasolinera["Rótulo"],gasPrecio:infoGasolinera[combustible[combustibleIndice]],html: cont}
        marcador.bindPopup(cont,{minWidth: 500}).openPopup();
        listaGasolineras.push(gasolinera);
        
        markers.push(marcador.addTo(map).on('click',()=>{
            translateCards(getLanguage())
        }));
    })
    
}

export function  buscadorInformacionGasolinera(gasolineras,markers,map,iconGas,listaGasolineras){

    gasolineras.forEach(gasolinera => {
        //console.log(gasolinera)
        let coordGasolinera=gasolinera.split(",")
          for (let i = 0; i < coordGasolinera.length; i++) {
              var valorRedondeado= parseFloat(coordGasolinera[i]).toFixed(3);
              coordGasolinera[i] = valorRedondeado;
          }
        //console.log(coordGasolinera)
        let idgasolinera = coordGasolinera[1]+";"+coordGasolinera[0]
        console.log(idgasolinera)
        getGasolineraInfo(idgasolinera).then((gasInfo)=>{
            pushMarcadorInformacion(markers,gasInfo,map,iconGas,listaGasolineras);
        })

        document.getElementById("diesel").addEventListener("click",function(){
            combustibleIndice = 2;
            getGasolineraInfo(idgasolinera).then((gasInfo)=>{
                pushMarcadorInformacion(markers,gasInfo,map,iconGas,listaGasolineras);
            })     
        })
        document.getElementById("gasolina95").addEventListener("click",function(){
            combustibleIndice = 0;
            getGasolineraInfo(idgasolinera).then((gasInfo)=>{
                pushMarcadorInformacion(markers,gasInfo,map,iconGas,listaGasolineras);
            })     
        })
        document.getElementById("gasolina98").addEventListener("click",function(){
            combustibleIndice = 1;
            getGasolineraInfo(idgasolinera).then((gasInfo)=>{
                pushMarcadorInformacion(markers,gasInfo,map,iconGas,listaGasolineras);
            })     
        })
        document.getElementById("dieselplus").addEventListener("click",function(){
            combustibleIndice = 3;
            getGasolineraInfo(idgasolinera).then((gasInfo)=>{
                pushMarcadorInformacion(markers,gasInfo,map,iconGas,listaGasolineras);
            })     
        })
    });
    /*return fetch("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/")
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
    })  */
}

function ParsearUbcicacion(calle, codigo) {
    const url = "https://www.google.es/maps/place/";
    const calleParseada = calle.replace(/\s+/g, "+");
    var resultado = url.concat(calleParseada)
    resultado = resultado.concat(",+");
    return resultado.concat(codigo);
}