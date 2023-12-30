const socket = io('/inicio');
localStorage.setItem("mini", "login")

localStorage.removeItem("premio");
localStorage.removeItem("ganador");
localStorage.setItem("url", 'inicio');


//LOADER
window.addEventListener("load", function() {
    document.querySelector(".loaderContent").style.display = "none";
});


//ENVIA SOCKET PRESNOM

//RECIBE SOCKET PRESNOM
socket.on("PRESNOM", (premio)=>{
    localStorage.setItem("premio", premio);
    window.location.href = '/presNom';
});


//ENVIA SOCKET CAMBIO
document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowRight"){
        socket.emit("CAMBIO","p23");
        localStorage.setItem("url", "p23")
    }
});
//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});

//RECIBE SOCKET VIDP23
var player1, player2, player3, player4, player5;

let listVidId = {
    "vid1": "zvDLvbwD2ts",/* caja_intro */
    "vid2": "wH1cDdMQ0Jg"/* remember */,
    "vid3": "1-ZEIDXi3SQ"/* novenos */,
    "vid4": "oYwuhCmEYm4"/* cardumen */,
    "vid5": "ZQULWNnWqCQ"/* canción */
}

function toggleVideo(videoId) {
    // Verifica el estado del video y actúa en consecuencia
    if (videoId === listVidId['vid1']) {
        if (!player1) {
            reproducirVideo(videoId, 'reproductor1');
        } else {
            ocultarVideo(player1, 'reproductor1');
        }
    } else if (videoId === listVidId['vid2']) {
        if (!player2) {
            reproducirVideo(videoId, 'reproductor2');
        } else {
            ocultarVideo(player2, 'reproductor2');
        }
    } else if (videoId === listVidId['vid3']) {
        if (!player2) {
            reproducirVideo(videoId, 'reproductor3');
        } else {
            ocultarVideo(player3, 'reproductor3');
        }
    } else if (videoId === listVidId['vid4']) {
        if (!player2) {
            reproducirVideo(videoId, 'reproductor4');
        } else {
            ocultarVideo(player4, 'reproductor4');
        }
    } else if (videoId === listVidId['vid5']) {
        if (!player2) {
            reproducirVideo(videoId, 'reproductor5');
        } else {
            ocultarVideo(player5, 'reproductor5');
        }
    }
}

// Función para cargar y reproducir el video
function reproducirVideo(videoId, containerId) {
    // Insertar el reproductor de YouTube en el contenedor
    window['player' + videoId] = new YT.Player(containerId, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady
        }
    });
}

// Esta función se llama cuando el reproductor está listo
function onPlayerReady(event) {
    // Reproduce el video cuando el usuario interactúa con la página
    event.target.playVideo();
}

// Función para ocultar el video
function ocultarVideo(player, containerId) {
    if (player) {
        // Detén el video y oculta el contenedor
        player.stopVideo();
        document.getElementById(containerId).innerHTML = '';
        currentVideoId = null;
    }
}


socket.on("VIDP23", (estado)=>{
    toggleVideo(listVidId[estado])
});
