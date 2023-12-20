const socket = io('/acertarMinis');
localStorage.setItem("mini", "acertarUser")

//QR
var qrcodeDiv = document.getElementById("qrcode");
var urlQR = window.location.origin + "/premios23/acertarUser";
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
let numAcertar = [0,0,0,0,0,0,0,0];
let listOpc  = ["jime", "asier", "joche", "koux", "juan", "mateos", "navarro", "alberto"];
let listUser = [];
let resetNum;
let listaVot = 0;

let rankPts = [0, 0, 0];
let rankUser = ["...", "...", "..."];
let ptsUser = []
let inicioTiempoPreg;

fetch("../minis/user.json")
.then(response => response.json())
.then(data => {
    resetNum = "0 / "+ data.user.length;
    document.getElementById("acertarTit").innerHTML = resetNum;
    document.getElementById("acertarPreg").innerHTML = resetNum;
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

function calculatePuntuaje(user, tiempoFin){
    let diferenciaEnMilisegundos = tiempoFin - inicioTiempoPreg;
    let diferenciaEnSegundos = diferenciaEnMilisegundos / 1000;
    let pts;

    if (diferenciaEnSegundos === 0) {
        pts = 1000; 
    } else if (diferenciaEnSegundos >= 20) {
        pts = 0;
    } else {
        let puntaje = 1000 - Math.floor(diferenciaEnSegundos * 50);
        pts = Math.max(0, puntaje); 
    }

    ptsUser[listUser.indexOf(user)] = ptsUser[listUser.indexOf(user)] + pts;
    
    actualizarRanking(user, ptsUser[listUser.indexOf(user)])
}

function actualizarRanking(user, pts) {
    var index = rankUser.indexOf(user);

    if (index !== -1) {
    rankPts[index] = pts;
    } else {
    rankUser.push(user);
    rankPts.push(pts);
    }

    var sortedRanking = rankPts.map(function (value, index) {
    return { user: rankUser[index], pts: value };
    }).sort(function (a, b) {
    return b.pts - a.pts;
    });

    rankUser = sortedRanking.slice(0, 3).map(function (element) {
    return element.user;
    });

    rankPts = sortedRanking.slice(0, 3).map(function (element) {
    return element.pts;
    });
}

//RECIBE SOCKET ACCIÓN_ACERTAR
socket.on("ACCIÓN_ACERTAR", (act)=>{
    if (act == "titulo"){
        noneScreens();
        titulo.style.display = "flex";
        numPreg = 0;
        socket.emit("TITULO");

    }else if (act == "sig" || act == "ant"){
        numAcertar = [0,0,0,0,0,0,0,0];
        listaVot = 0;
        document.getElementById("acertarPreg").innerHTML = resetNum;
        eliminarChildsDeClase("imgUsers");

        inicioTiempoPreg = new Date().getTime();

        if (pregunta.style.display == "none"){
            noneScreens();
            pregunta.style.display = "flex";
        }
        
        fetch("../minis.json")
        .then(response => response.json())
        .then(data => {
            
            if ((data.pregAcertar.length > numPreg && act == "sig") || (numPreg == 0 && act == "ant")){
                numPreg = numPreg + 1;
            }else if (numPreg > 1 && act == "ant"){
                numPreg = numPreg - 1;
            }

            pregunta.querySelector("h2").innerHTML = "preg "+ numPreg;
            pregunta.querySelector("h3").innerHTML = data.pregAcertar[numPreg-1]

            socket.emit("PREG", ["preg "+numPreg, data.pregAcertar[numPreg-1]]);
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));

    }else if (act == "votar" && numPreg > 0){
        noneScreens();
        votaciones.style.display = "flex";

        fetch("../minis.json")
        .then(response => response.json())
        .then(data => {
            votaciones.querySelector("h2").innerHTML = "preg "+ numPreg;
            votaciones.querySelector("h3").innerHTML = data.pregAcertar[numPreg-1]
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
            resolucion.querySelector("h3").innerHTML = data.pregAcertar[numPreg-1];
            resolucion.querySelector(".user").innerHTML = data.solAcertar[numPreg-1];

            socket.emit("RESOL", ["preg"+numPreg, data.pregAcertar[numPreg-1], data.solAcertar[numPreg-1]]);
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));

        document.getElementById("pos1").innerHTML = rankUser[0] + "<p>"+ rankPts[0] +"pts.</p>"
        document.getElementById("pos2").innerHTML = rankUser[1] + "<p>"+ rankPts[1] +"pts.</p>"
        document.getElementById("pos3").innerHTML = rankUser[2] + "<p>"+ rankPts[2] +"pts.</p>"
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
    let idOpc = listOpc.indexOf(opcUser);

    numAcertar[idOpc] = numAcertar[idOpc] + 1;
    listaVot = listaVot + 1;
    if (document.getElementById("acertarPreg").innerHTML[2] == "/"){
        document.getElementById("acertarPreg").innerHTML = listaVot + document.getElementById("acertarPreg").innerHTML.substring(1);
    }else{
        document.getElementById("acertarPreg").innerHTML = listaVot + document.getElementById("acertarPreg").innerHTML.substring(2);
    }

    fetch("../minis.json")
    .then(response => response.json())
    .then(dataMinis => {
        if (opcUser == dataMinis.solAcertar[numPreg - 1]){
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

            let tiempoEnviado = new Date().getTime();
            calculatePuntuaje(userName, tiempoEnviado);
        }
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));
});

//RECIBE SOCKET NEWUSER
socket.on("NEWUSER", (dataUser)=>{
    if (listUser.indexOf(dataUser) == -1){
        listUser.push(dataUser);
        ptsUser.push(0);
    }
    if (document.getElementById("acertarTit").innerHTML[2] == "/"){
        document.getElementById("acertarTit").innerHTML = listUser.length + document.getElementById("acertarTit").innerHTML.substring(1);
    }else{
        document.getElementById("acertarTit").innerHTML = listUser.length + document.getElementById("acertarTit").innerHTML.substring(2);
    }

    
});