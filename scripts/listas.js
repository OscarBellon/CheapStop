export function sortGasolineras(markers){
    markers.sort((a,b)=>parseFloat(a.gasPrecio.replace(",","."))-parseFloat(b.gasPrecio.replace(",",".")))
    console.log(markers);
    listarGasolineras(markers)
}

export function listarGasolineras(listaGasolineras){
    listaGasolineras.forEach(gasolinera => {
        let node = document.createElement("div");
        node.innerHTML=gasolinera.html;
        document.getElementById("gas-list").appendChild(node) 
    });   
}

export function clearListaGasolineras(){
    document.getElementById("gas-list").innerHTML=""
}