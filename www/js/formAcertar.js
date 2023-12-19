const socket = io('/formAcertar');

const butAñadir = document.querySelector(".contForm").querySelector("button");
const inpPreg = document.getElementById("pregAcertar");
const inpSol = document.getElementById("solAcertar");

butAñadir.addEventListener("click", ()=>{
    if (inpPreg.value != "" && inpSol.value != ""){
        let nuevaCont = document.createElement("div");
        nuevaCont.className = "contPreg";

        let nuevaPreg = document.createElement("div");
        nuevaPreg.className = "preg";
        nuevaPreg.textContent = inpPreg.value;
        inpPreg.value = "";

        let nuevaSol = document.createElement("div");
        nuevaSol.className = "sol";
        nuevaSol.textContent = inpSol.value;
        inpSol.value = "";

        nuevaCont.appendChild(nuevaPreg);
        nuevaCont.appendChild(nuevaSol);
        document.querySelector(".contForm").appendChild(nuevaCont);
    }
});

document.querySelector(".butEnviar").addEventListener("click", ()=>{
    let pregList = document.querySelectorAll(".preg");
    let solList = document.querySelectorAll(".sol");

    let pregText = [];
    let solText = [];

    pregList.forEach(function(preg, i){
        pregText.push(preg.innerHTML);
        solText.push(solList[i].innerHTML);
    })

    socket.emit("FORM", [pregText, solText]);
    
    window.location.href = "/inicio"
})