const socket = io('/nominados');
localStorage.setItem("mini", "login")

localStorage.removeItem("ganador");
localStorage.setItem("url", 'nominados');

//LOADER
window.addEventListener("load", function() {
    document.querySelector(".loaderContent").style.display = "none";
});


//ENVIA SOCKET GANADOR

//RECIBE SOCKET GANADOR
socket.on("GANADOR", (i)=>{
    localStorage.setItem("ganador", i);
    window.location.href = '/ganador';
});

//ENVIA SOCKET CAMBIO
document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowLeft") {
        socket.emit("CAMBIO","p23");
        localStorage.setItem("url", "p23");
    }
});
//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});

