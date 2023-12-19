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
let vidId;
socket.on("VIDP23", (estado)=>{
    vidId = estado;
    let videoElement = document.getElementById(estado+"Inicio");
    if (videoElement.style.display == "none"){
        videoElement.style.display = 'block';
        videoElement.play();
    }else{
        videoElement.style.display = "none";
        videoElement.pause();
        videoElement.currentTime = 0;
    }
});
//RECIBE SOCKET PLAYP23
socket.on("PLAYP23", (estado)=>{
    let videoElement = document.querySelector("video");
    if (estado == "play"){
        videoElement.play();
    }else{
        videoElement.pause();
    }
    console.log(estado);
});

document.querySelector("video").addEventListener('ended', function() {
    videoElement.currentTime = 0;
});