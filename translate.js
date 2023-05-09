
function translate(idioma){ 

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("./esp.json").then(result => result.json()).then(res => {updateWeb(res)});
            break

        case "en":
            fetch("./eng.json").then(result => result.json()).then(res => {updateWeb(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("./epr.json").then(result => result.json()).then(res => {updateWeb(res)});
            break

    }

}

function updateWeb(docs){
    console.log(docs)
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        console.log(id)
        document.getElementById(id).textContent = docs[id];
    }

}

document.getElementById("idiomaeo").addEventListener("click", () => {translate("eo")});
document.getElementById("idiomaes").addEventListener("click", () => {translate("es")});
document.getElementById("idiomaen").addEventListener("click", () => {translate("en")});