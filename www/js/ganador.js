const socket = io('/ganador');
localStorage.setItem("mini", "login")

localStorage.setItem("url", 'ganador');

//LOADER
window.addEventListener("load", function() {
    document.querySelector(".loaderContent").style.display = "none";
});


//ENVIA SOCKET CAMBIO
document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowLeft") {
        socket.emit("CAMBIO","nominados");
        localStorage.setItem("url", "nominados");
    }else if (event.code === "ArrowRight"){
        socket.emit("CAMBIO","p23");
        localStorage.setItem("url", "p23");
    }
});
//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});

//ACTUALIZAR JSON
let premioStorage = localStorage.getItem("premio")
let ganadorStorage = localStorage.getItem("ganador")
socket.emit("ACTUALIZAR",[premioStorage, ganadorStorage]);
