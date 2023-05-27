//var language = "es";
export function getLanguage(){
   //return language;
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'es');
    }
    return localStorage.getItem('language');
}

export function setLanguage(idioma){
    //language = idioma;
    localStorage.setItem('language', idioma);
    console.log(localStorage.getItem('language'));
}

function changeLanguaje(idioma){
    //language = idioma;
    setLanguage(idioma);
    translate(idioma);
    translatePlaceholder(idioma);
    translateCards(idioma);
}

export function translate(idioma){ 

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

export function translatePlaceholder(idioma){

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
            fetch("/translations/eo_cards.json").then(result => result.json()).then(res => {updateNodes(res)});
            break

    }

}

export function translateLogin(idioma){

    console.log("Traduciendo...")
    console.log("Idioma");

    switch(idioma){

        case "es":
            fetch("/translations/es_login.json").then(result => result.json()).then(res => {updateLogin(res)});
            break

        case "en":
            fetch("/translations/en_login.json").then(result => result.json()).then(res => {updateLogin(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_login.json").then(result => result.json()).then(res => {updateLogin(res)});
            break

    }

}

export function translateRegister(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_register.json").then(result => result.json()).then(res => {updateRegister(res)});
            break

        case "en":
            fetch("/translations/en_register.json").then(result => result.json()).then(res => {updateRegister(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_register.json").then(result => result.json()).then(res => {updateRegister(res)});
            break

    }

}

export function translateInterface(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_interface.json").then(result => result.json()).then(res => {updateInterface(res)});
            break

        case "en":
            fetch("/translations/en_interface.json").then(result => result.json()).then(res => {updateInterface(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_interface.json").then(result => result.json()).then(res => {updateInterface(res)});
            break

    }

}

export function translateProfile(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_perfil.json").then(result => result.json()).then(res => {updateProfile(res)});
            break

        case "en":
            fetch("/translations/en_perfil.json").then(result => result.json()).then(res => {updateProfile(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_perfil.json").then(result => result.json()).then(res => {updateProfile(res)});
            break

    }

}

export function translatePreferences(idioma){

    console.log("Traduciendo...")

    switch(idioma){

        case "es":
            fetch("/translations/es_preferences.json").then(result => result.json()).then(res => {updatePreferences(res)});
            break

        case "en":
            fetch("/translations/en_preferences.json").then(result => result.json()).then(res => {updatePreferences(res)});
            break

        case "eo":
            console.log("Esperanto")
            fetch("/translations/eo_preferences.json").then(result => result.json()).then(res => {updatePreferences(res)});
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
        //console.log(id)
        console.log(document.querySelectorAll("#"+id))
        document.querySelectorAll("#"+id).forEach(elemento => {
            console.log("element found")
            elemento.textContent=docs[id];
        })
    }
}

export function updateLogin(docs){
    console.log("Ha comenzado la traduccion del Login");
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        let element = document.getElementById(id);
        if(element) {
            if(element.nodeName === "INPUT") {
                if (element.placeholder !== undefined && element.placeholder !== '') {
                    element.placeholder = docs[id];
                } else {
                    element.value = docs[id];
                }
            } else {
                element.textContent = docs[id];
            }
        }
    }
    console.log("Ha terminado");
}

export function updateRegister(docs){
    console.log("Ha comenzado la traduccion del Register");
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        let element = document.getElementById(id);
        if(element) {
            if(element.nodeName === "INPUT") {
                if (element.placeholder !== undefined && element.placeholder !== '') {
                    element.placeholder = docs[id];
                } else {
                    element.value = docs[id];
                }
            } else {
                element.textContent = docs[id];
            }
        }
    }
    console.log("Ha terminado");
}

export function updateProfile(docs){
    console.log("Ha comenzado la traduccion del Perfil");
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        let element = document.getElementById(id);
        if(element) {
            if(element.nodeName === "INPUT") {
                if (element.placeholder !== undefined && element.placeholder !== '') {
                    element.placeholder = docs[id];
                } else {
                    element.value = docs[id];
                }
            } else {
                element.textContent = docs[id];
            }
        }
    }
    console.log("Ha terminado");
}

export function updateInterface(docs){
    console.log("Ha comenzado la traduccion del Perfil");
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        let element = document.getElementById(id);
        if(element) {
            if(element.nodeName === "INPUT") {
                if (element.placeholder !== undefined && element.placeholder !== '') {
                    element.placeholder = docs[id];
                } else {
                    element.value = docs[id];
                }
            } else {
                element.textContent = docs[id];
            }
        }
    }
    console.log("Ha terminado");
}

export function updatePreferences(docs){
    console.log("Ha comenzado la traducción de las Preferencias");
    let ids = Object.keys(docs);
    for(let i=0; i<ids.length;i++){
        let id = ids[i];
        let element = document.getElementById(id);
        if(element) {
            if(element.nodeName === "INPUT") {
                if (element.placeholder !== undefined && element.placeholder !== '') {
                    element.placeholder = docs[id];
                } else {
                    element.value = docs[id];
                }
            } else {
                element.textContent = docs[id];
            }
        }
    }
    console.log("Ha terminado");
}

/*document.getElementById("idiomaeo").addEventListener("click", () => {changeLanguaje("eo")});
document.getElementById("idiomaes").addEventListener("click", () => {changeLanguaje("es")});
document.getElementById("idiomaen").addEventListener("click", () => {changeLanguaje("en")});*/
window.addEventListener('DOMContentLoaded', (event) => {
    const idiomaEn = document.getElementById("idiomaen");
    const idiomaEs = document.getElementById("idiomaes");
    const idiomaEo = document.getElementById("idiomaeo");

    if (idiomaEn) {
        idiomaEn.addEventListener("click", () => {changeLanguaje("en")});
    }

    if (idiomaEs) {
        idiomaEs.addEventListener("click", () => {changeLanguaje("es")});
    }

    if (idiomaEo) {
        idiomaEo.addEventListener("click", () => {changeLanguaje("eo")});
    }
});
