const socket = io('/formProbable');

const butAñadir = document.querySelector(".contForm").querySelector("button");
const inpPreg = document.getElementById("pregAcertar");

butAñadir.addEventListener("click", ()=>{
    if (inpPreg.value != ""){
        let nuevaCont = document.createElement("div");
        nuevaCont.className = "contPreg";

        let nuevaPreg = document.createElement("div");
        nuevaPreg.className = "preg";
        nuevaPreg.textContent = inpPreg.value;
        inpPreg.value = "";

        nuevaCont.appendChild(nuevaPreg);
        document.querySelector(".contForm").appendChild(nuevaCont);
    }
});

document.querySelector(".butEnviar").addEventListener("click", ()=>{
    let pregList = document.querySelectorAll(".preg");

    let pregText = [];

    pregList.forEach(function(preg, i){
        pregText.push(preg.innerHTML);
    })

    socket.emit("FORM", pregText);

    window.location.href = "/inicio"
})