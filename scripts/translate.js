var language = "es";

export function getLanguage(){
    language;
}

export function setLAnguage(idioma){
    language = idioma;
}

function changeLanguaje(idioma){
    language = idioma;
    translate(idioma);
    translatePlaceholder(idioma);
    translateCards(idioma);
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

export function translateCards(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_cards.json").then(result => result.json()).then(res => {updateNodes(res)});
            break

        case "en":
            fetch("/translations/en_cards.json").then(result => result.json()).then(res => {updateNodes(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_card.json").then(result => result.json()).then(res => {updateNodes(res)});
            break

    }

}

export function translateLogin(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_cards.json").then(result => result.json()).then(res => {updateLogin(res)});
            break

        case "en":
            fetch("/translations/en_cards.json").then(result => result.json()).then(res => {updateLogin(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_card.json").then(result => result.json()).then(res => {updateLogin(res)});
            break

    }

}

export function translateRegister(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_cards.json").then(result => result.json()).then(res => {updateRegister(res)});
            break

        case "en":
            fetch("/translations/en_cards.json").then(result => result.json()).then(res => {updateRegister(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_card.json").then(result => result.json()).then(res => {updateRegister(res)});
            break

    }

}

export function translateProfile(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_cards.json").then(result => result.json()).then(res => {updateProfile(res)});
            break

        case "en":
            fetch("/translations/en_cards.json").then(result => result.json()).then(res => {updateProfile(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_card.json").then(result => result.json()).then(res => {updateProfile(res)});
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

export function updateNodes(docs){
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        console.log(id)
        document.querySelectorAll("id").forEach(elemento => {
            elemento.textContent=docs[id];
        })
    }
}

export function updateLogin(docs){
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        console.log(id)
        document.querySelectorAll("id").forEach(elemento => {
            elemento.textContent=docs[id];
        })
    }
}

export function updateRegister(docs){
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        console.log(id)
        document.querySelectorAll("id").forEach(elemento => {
            elemento.textContent=docs[id];
        })
    }
}

export function updateProfile(docs){
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        console.log(id)
        document.querySelectorAll("id").forEach(elemento => {
            elemento.textContent=docs[id];
        })
    }
}

document.getElementById("idiomaeo").addEventListener("click", () => {changeLanguaje("eo")});
document.getElementById("idiomaes").addEventListener("click", () => {changeLanguaje("es")});
document.getElementById("idiomaen").addEventListener("click", () => {changeLanguaje("en")});