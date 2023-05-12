
var language = "es";

export function getLanguage(){
    return this.language;
}

export function setLAnguage(idioma){
    this.language = idioma;
}

function changeLanguaje(idioma){
    language = idioma;
    translate(idioma);
    translatePlaceholder(idioma);
}

function translate(idioma){ 

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/esp.json").then(result => result.json()).then(res => {updateWeb(res)});
            break

        case "en":
            fetch("/translations/eng.json").then(result => result.json()).then(res => {updateWeb(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/epr.json").then(result => result.json()).then(res => {updateWeb(res)});
            break

    }

}

function translatePlaceholder(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_placeholder.json").then(result => result.json()).then(res => {updatePlaceholders(res)});
            break

        case "en":
            fetch("/translations/en_placeholder.json").then(result => result.json()).then(res => {updatePlaceholders(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_placeholder.json").then(result => result.json()).then(res => {updatePlaceholders(res)});
            break

    }

}

function updatePlaceholders(docs){

    console.log(docs)
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        console.log(id)
        document.getElementById(id).placeholder = docs[id];
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

document.getElementById("idiomaeo").addEventListener("click", () => {changeLanguaje("eo")});
document.getElementById("idiomaes").addEventListener("click", () => {changeLanguaje("es")});
document.getElementById("idiomaen").addEventListener("click", () => {changeLanguaje("en")});