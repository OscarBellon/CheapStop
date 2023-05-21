import { getLanguage, updateNodes, translateCards} from "./translate.js";

export function sortGasolineras(markers){
    markers.sort((a,b)=>parseFloat(a.gasPrecio)-parseFloat(b.gasPrecio))
    console.log(markers);
    listarGasolineras(markers)
}

export function listarGasolineras(listaGasolineras){
    document.getElementById("gas-list").innerHTML="";
    listaGasolineras.forEach(gasolinera => {
        let node = document.createElement("div");
        node.innerHTML=gasolinera.html;
        document.getElementById("gas-list").appendChild(node) 
    });
    console.log(getLanguage())
    translateCards(getLanguage())
}

export function clearListaGasolineras(){
    document.getElementById("gas-list").innerHTML=""
}