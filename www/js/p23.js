const socket = io('/p23');
localStorage.setItem("mini", "login")

localStorage.removeItem("premio");
localStorage.removeItem("ganador");
localStorage.setItem("url", 'p23');


//LOADER
window.addEventListener("load", function() {
    document.querySelector(".loaderContent").style.display = "none";
});


//ENVIA SOCKET PRESNOM
let premiosDOM = document.querySelectorAll(".prem");
premiosDOM.forEach( premio => {
    premio.addEventListener("click", ()=>{
        localStorage.setItem("url", "presNom");
        socket.emit("PRESNOM",premio.querySelector("p").textContent);
    });
});
//RECIBE SOCKET PRESNOM
socket.on("PRESNOM", (premio)=>{
    localStorage.setItem("premio", premio);
    window.location.href = '/presNom';
});


//ENVIA SOCKET CAMBIO
document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowLeft") {
        socket.emit("CAMBIO","inicio");
        localStorage.setItem("url", 'inicio');
    }else if (event.code === "ArrowRight"){
        socket.emit("CAMBIO","p22");
        localStorage.setItem("url", 'p22');
    }else if (event.code === "KeyR"){
        socket.emit("RESETGANADOR");
        window.location.href = "/p23";
    }
});
//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});