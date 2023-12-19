const socket = io('/p21');
localStorage.setItem("mini", "login")

localStorage.removeItem("premio");
localStorage.removeItem("ganador");
localStorage.setItem("url", 'p21');


//LOADER
window.addEventListener("load", function() {
    document.querySelector(".loaderContent").style.display = "none";
});


//ENVIA SOCKET CAMBIO
document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowLeft") {
        socket.emit("CAMBIO","p22");
        localStorage.setItem("url", 'p22');
    }else if (event.code === "ArrowRight"){
        socket.emit("CAMBIO","p23");
        localStorage.setItem("url", 'p23');
    }
});
//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});