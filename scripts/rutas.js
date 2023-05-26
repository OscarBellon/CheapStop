export async function busquedaOrigenDestino(origen, destino) {
    let urlOrigen="https://nominatim.openstreetmap.org/search.php?q=" +
    origen +
    "&format=jsonv2";
    let urlDestino="https://nominatim.openstreetmap.org/search.php?q=" +
    destino +
    "&format=jsonv2";
    var ubicaciones=[]
    var fetches=[];

    fetches.push(fetch(urlOrigen)
    .then(function (response) {
        return response.json();
    }).then(function(data){
        ubicaciones.push([parseFloat(data[0].lat),parseFloat(data[0].lon)]);
    }))

    fetches.push(fetch(urlDestino)
    .then(function (response) {
        return response.json();
    }).then(function(data){
        ubicaciones.push([parseFloat(data[0].lat),parseFloat(data[0].lon)]);
    }))

    return Promise.all(fetches).then(function () {
        return ubicaciones;
    })
}

export async function busacdorRuta(origen, destino) {
    var routeURL=
    "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248ec6cc375881a440db695f6f2fb789576&start=" +
    origen[1] +
    "," +
    origen[0] +
    "&end=" +
    destino[1] +
    "," +
    destino[0];

    var coords = [];
    var fetches =[];
    fetches.push(fetch(routeURL)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        coords=data.features[0].geometry.coordinates.map(
            function (coord){
                return [coord[1], coord[0]];
            }
        )
    }))

    return Promise.all(fetches).then(function(){
        return coords
    });
}