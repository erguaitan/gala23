const socket = io('/kahootMinis');
localStorage.setItem("mini", "kahootUser")

//QR
var qrcodeDiv = document.getElementById("qrcode");
var urlQR = window.location.origin + "/premios23/kahootUser";
var qrcode = new QRCode(qrcodeDiv, {
    text: urlQR,
    width: 150,
    height: 150, 
});

const titulo = document.querySelector(".titulo");
const pregunta = document.querySelector(".pregunta");
const votaciones = document.querySelector(".votaciones");
const resolucion = document.querySelector(".resolucion");
let numPreg = 0;
let numAcertar = [0,0,0,0];
let listUser = [];
let resetNum;
let listaVot = 0;


fetch("../minis/user.json")
.then(response => response.json())
.then(data => {
    resetNum = "0 / "+ data.user.length;
    document.getElementById("kahootTit").innerHTML = resetNum;
    document.getElementById("kahootPreg").innerHTML = resetNum;
})
.catch(error => console.error("Error al cargar el archivo JSON: " + error));


function noneScreens(){
    titulo.style.display = "none";
    pregunta.style.display = "none";
    votaciones.style.display = "none";
    resolucion.style.display = "none";
}

function eliminarChildsDeClase(className) {
    const elementos = document.getElementsByClassName(className);
    for (let i = 0; i < elementos.length; i++) {
        while (elementos[i].firstChild) {
            elementos[i].removeChild(elementos[i].firstChild);
        }
    }
}


//RECIBE SOCKET ACCIÓN_ACERTAR
socket.on("ACCIÓN_KAHOOT", (act)=>{
    if (act == "titulo"){
        noneScreens();
        titulo.style.display = "flex";
        numPreg = 0;
        socket.emit("TITULO");

    }else if (act == "sig" || act == "ant"){
        numAcertar = [0,0,0,0];
        listaVot = 0;
        document.getElementById("kahootPreg").innerHTML = resetNum;
        eliminarChildsDeClase("imgUsers");

        if (pregunta.style.display == "none"){
            noneScreens();
            pregunta.style.display = "flex";
        }
        
        fetch("../minis.json")
        .then(response => response.json())
        .then(data => {
            
            if ((data.pregKahoot.length > numPreg && act == "sig") || (numPreg == 0 && act == "ant")){
                numPreg = numPreg + 1;
            }else if (numPreg > 1 && act == "ant"){
                numPreg = numPreg - 1;
            }

            pregunta.querySelector("h2").innerHTML = "preg "+ numPreg;
            pregunta.querySelector("h3").innerHTML = data.pregKahoot[numPreg-1]

            socket.emit("PREG", ["preg "+numPreg, data.pregKahoot[numPreg-1], data.opcKahoot[numPreg-1]]);
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));

    }else if (act == "votar" && numPreg > 0){
        noneScreens();
        votaciones.style.display = "flex";

        fetch("../minis.json")
        .then(response => response.json())
        .then(data => {
            votaciones.querySelector("h2").innerHTML = "preg "+ numPreg;
            votaciones.querySelector("h3").innerHTML = data.pregKahoot[numPreg-1];
            votaciones.querySelectorAll(".user")[0].innerHTML = data.opcKahoot[numPreg-1][0];
            votaciones.querySelectorAll(".user")[1].innerHTML = data.opcKahoot[numPreg-1][1];
            votaciones.querySelectorAll(".user")[2].innerHTML = data.opcKahoot[numPreg-1][2];
            votaciones.querySelectorAll(".user")[3].innerHTML = data.opcKahoot[numPreg-1][3];
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));
        
        document.querySelectorAll(".opc").forEach(function(opc, i){
            opc.querySelector(".num").innerHTML = numAcertar[i];
        });
        
    }else if (act == "resol" && numPreg > 0){
        noneScreens();
        resolucion.style.display = "flex";
        
        fetch("../minis.json")
        .then(response => response.json())
        .then(data => {
            resolucion.querySelector("h2").innerHTML = "preg "+ numPreg;
            resolucion.querySelector("h3").innerHTML = data.pregKahoot[numPreg-1];
            resolucion.querySelector(".user").innerHTML = data.solKahoot[numPreg-1];

            socket.emit("RESOL", ["preg"+numPreg, data.pregKahoot[numPreg-1], data.solKahoot[numPreg-1]]);
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));
    }
});
//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});
//RECIBE SOCKET VOTACION
socket.on("VOTACION", (dataAcertar)=>{
    let userName = dataAcertar[0];
    let opcUser = dataAcertar[1];
    let idOpc = dataAcertar[2];

    numAcertar[idOpc] = numAcertar[idOpc] + 1;
    listaVot = listaVot + 1;
    if (document.getElementById("kahootPreg").innerHTML[2] == "/"){
        document.getElementById("kahootPreg").innerHTML = listaVot + document.getElementById("kahootPreg").innerHTML.substring(1);
    }else{
        document.getElementById("kahootPreg").innerHTML = listaVot + document.getElementById("kahootPreg").innerHTML.substring(2);
    }

    fetch("../minis.json")
    .then(response => response.json())
    .then(dataMinis => {
        if (opcUser == dataMinis.solKahoot[numPreg - 1]){
            fetch("../minis/user.json")
            .then(response => response.json())
            .then(dataUser => {
                let idUser = dataUser.user.indexOf(userName);
                let urlUser = dataUser.img[idUser];
                
                let userCorrect = document.createElement("div");
                userCorrect.style = "background-image: url("+  urlUser +");";

                document.querySelector(".imgUsers").appendChild(userCorrect);
            })
            .catch(error => console.error("Error al cargar el archivo JSON: " + error));  
        }
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));
});

//RECIBE SOCKET NEWUSER
socket.on("NEWUSER", (dataUser)=>{
    if (listUser.indexOf(dataUser) == -1){
        listUser.push(dataUser);
    }
    if (document.getElementById("kahootTit").innerHTML[2] == "/"){
        document.getElementById("kahootTit").innerHTML = listUser.length + document.getElementById("kahootTit").innerHTML.substring(1);
    }else{
        document.getElementById("kahootTit").innerHTML = listUser.length + document.getElementById("kahootTit").innerHTML.substring(2);
    }

    
});