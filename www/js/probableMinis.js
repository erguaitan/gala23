const socket = io('/probableMinis');
localStorage.setItem("mini", "probableUser")

//QR
var qrcodeDiv = document.getElementById("qrcode");
var urlQR = window.location.origin + "/premios23/probableUser";
var qrcode = new QRCode(qrcodeDiv, {
    text: urlQR,
    width: 150,
    height: 150, 
});


const titulo = document.querySelector(".titulo");
const pregunta = document.querySelector(".pregunta");
const votaciones = document.querySelector(".votaciones");
let resetNum;
let numPreg = 0;
let listUser = [];
let resp = {
    "jime" : [],
    "asier" : [],
    "joche" : [],
    "koux" : [],
    "juan" : [],
    "mateos" : [],
    "navarro" : [],
    "alberto" : []
    };
let listaVot = 0;
let opcVot = 0;

fetch("../minis/user.json")
.then(response => response.json())
.then(data => {
    resetNum = "0 / "+ data.user.length;
    document.getElementById("probableTit").innerHTML = resetNum;
    document.getElementById("probablePreg").innerHTML = resetNum;
})
.catch(error => console.error("Error al cargar el archivo JSON: " + error));

function noneScreens(){
    titulo.style.display = "none";
    pregunta.style.display = "none";
    votaciones.style.display = "none";
}

function eliminarChildsDeClase(className) {
    const opcList = document.querySelectorAll("."+className);

    opcList.forEach(opc => {
        opc.querySelector(".img").remove();

        let newOpc = document.createElement("div");
        newOpc.className = "img";
        newOpc.id = opc.querySelector(".user").innerHTML + "Probable";
        
        opc.appendChild(newOpc);
    });
}

function resetrespuestas(){
    resp = {
        "jime" : [],
        "asier" : [],
        "joche" : [],
        "koux" : [],
        "juan" : [],
        "mateos" : [],
        "navarro" : [],
        "alberto" : []
        };

    document.querySelectorAll(".opc").forEach(opcAtun => {
        opcAtun.style.display = "none";
    });
}

//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});
//RECIBE SOCKET ACCIÓN_PROBABLE
socket.on("ACCIÓN_PROBABLE", (act)=>{
    if (act == "titulo"){
        noneScreens();
        titulo.style.display = "flex";
        numPreg = 0;
        socket.emit("TITULO");

    }else if (act == "sig" || act == "ant"){
        document.getElementById("probablePreg").innerHTML = resetNum;
        eliminarChildsDeClase("opc");
        resetrespuestas();
        listaVot = 0;

        if (pregunta.style.display == "none"){
            noneScreens();
            pregunta.style.display = "flex";
        }
        
        fetch("../minis.json")
        .then(response => response.json())
        .then(data => {
            
            if ((data.pregProbable.length > numPreg && act == "sig") || (numPreg == 0 && act == "ant")){
                numPreg = numPreg + 1;
            }else if (numPreg > 1 && act == "ant"){
                numPreg = numPreg - 1;
            }

            pregunta.querySelector("h2").innerHTML = "preg "+ numPreg;
            pregunta.querySelector("h3").innerHTML = data.pregProbable[numPreg-1]

            socket.emit("PREG", ["preg"+numPreg, data.pregProbable[numPreg-1]]);
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));

    }else if (act == "votar" && numPreg > 0){
        noneScreens();
        votaciones.style.display = "flex";

        fetch("../minis.json")
        .then(response => response.json())
        .then(data => {
            votaciones.querySelector("h2").innerHTML = "preg "+ numPreg;
            votaciones.querySelector("h3").innerHTML = data.pregProbable[numPreg-1]
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));
        
        //mostrarSoloLosRespondidos
        Object.keys(resp).forEach(function(key) {
            if (resp[key].length > 0) {
                opcVot++;
                document.getElementById(key+"Probable").parentNode.style.display = "flex";
            }
        });
        
        if (opcVot > 4){
            document.getElementById("opcVot").className = "opcVotacionesPlus";
        }else{
            document.getElementById("opcVot").className = "opcVotaciones";
        }
    }
});
//RECIBE SOCKET NEWUSER
socket.on("NEWUSER", (dataUser)=>{
    if (listUser.indexOf(dataUser) == -1){
        listUser.push(dataUser);
    }

    if (document.getElementById("probableTit").innerHTML[2] == "/"){
        document.getElementById("probableTit").innerHTML = listUser.length + document.getElementById("probableTit").innerHTML.substring(1);
    }else{
        document.getElementById("probableTit").innerHTML = listUser.length + document.getElementById("probableTit").innerHTML.substring(2);
    }
});
//RECIBE SOCKET VOTACION
socket.on("VOTACION", (dataAcertar)=>{
    let userName = dataAcertar[0];
    let opcUser = dataAcertar[1];

    listaVot = listaVot + 1;
    if (document.getElementById("probablePreg").innerHTML[2] == "/"){
        document.getElementById("probablePreg").innerHTML = listaVot + document.getElementById("probablePreg").innerHTML.substring(1);
    }else{
        document.getElementById("probablePreg").innerHTML = listaVot + document.getElementById("probablePreg").innerHTML.substring(2);
    }

    resp[opcUser].push(userName);

    fetch("../minis/user.json")
    .then(response => response.json())
    .then(dataUser => {
        let idUser = dataUser.user.indexOf(userName);
        let urlUser = dataUser.img[idUser];
        
        let userCorrect = document.createElement("div");
        userCorrect.style = "background-image: url("+  urlUser +");";

        //añadir foto
        document.getElementById(opcUser+"Probable").appendChild(userCorrect);
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));  
});
