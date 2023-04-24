export function sortGasolineras(markers){
    markers.sort((a,b)=>parseFloat(a.gasPrecio.replace(",","."))-parseFloat(b.gasPrecio.replace(",",".")))
    console.log(markers);
}