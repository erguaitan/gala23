const socket = io('/presNom');
localStorage.setItem("mini", "login")

localStorage.removeItem("ganador");
localStorage.setItem("url", 'presNom');

let listVidId = {
    "mvp": "0SOhEmNAMZM",
    "mejora": "GDcW7Nct2Xo",
    "desmejora": "x62sKt5HCNI",
    "noveno": "cDlP9SPcUNQ",
    "momento": "w51AlyELdeM",
    "meme": "_1tM-WYhMVE",
    "foto": "zbyhx5_tk0o",
    "video": "FqxLqWVLU7I",
    "canción": "pP6bwSuSWyk",
    "cardumen": "P_zpdMb2aDg",
    "edit": "UCDoWwn7UU0",
    "locura": "nxxEHELJEak",
    "follador": "syqNfsfXsr8",
    "outfit": "6B9pXQa80g"
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
