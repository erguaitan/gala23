const socket = io('/presNom');
localStorage.setItem("mini", "login")

localStorage.removeItem("ganador");
localStorage.setItem("url", 'presNom');

let listVidId = {
    "mvp": "_VNBGvbRa7k",
    "mejora": "v9iCUSuGqG8",
    "desmejora": "5t-UoROKW5I",
    "noveno": "beiqPOsXCvA",
    "momento": "lclEf0snj6k",
    "meme": "RY3Zf-U8I5s",
    "foto": "sl1N6qMQoC8",
    "video": "giWuAZbNFBQ",
    "canción": "zAp1FOn2WcY",
    "cardumen": "wMuejvTsxRY",
    "edit": "wopRdX4Gvr0",
    "locura": "cBNOVqw3zhA",
    "follador": "WXVjsnSOJJA",
    "outfit": "1hCR9USje3E"
}

//LOADER
window.addEventListener("load", function() {
    document.querySelector(".loaderContent").style.display = "none";
});


//ENVIA SOCKET CAMBIO
document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowLeft") {
        socket.emit("CAMBIO","p23");
        localStorage.setItem("url", "p23");
    }else if (event.code === "ArrowRight"){
        socket.emit("CAMBIO","nominados");
        localStorage.setItem("url", "nominados");
    }
});
//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});

//RECIBE SOCKET VIDP23
let vidId;
let player
socket.on("VIDP23", (estado)=>{

    let currentPremio = localStorage.getItem("premio");

    if (player) {
        if (document.querySelector("iframe").style.display != "none"){
            player.pauseVideo();
            document.querySelector("iframe").style.display = "none"
        }
    }    
    
    var videoId = listVidId[currentPremio];

    player = new YT.Player('reproductor', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady
        }
    });

function onPlayerReady(event) {
    // Reproduce el video cuando el usuario interactúa con la página
    event.target.playVideo();
}


});
