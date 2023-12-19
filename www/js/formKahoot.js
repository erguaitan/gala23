const socket = io('/formKahoot');

const butAñadir = document.querySelector(".contForm").querySelector("button");
const inpPreg = document.getElementById("pregKahoot");
const inpSol = document.getElementById("solKahoot");
const inpOpcList = document.querySelector(".contOpcInp").querySelectorAll("input");
let seguir = true;

butAñadir.addEventListener("click", ()=>{
    inpOpcList.forEach(opc =>{
        if (opc.value === ""){
            seguir = false;
        }
    });

    if (inpPreg.value != "" && inpSol.value != "" && seguir == true){
        let nuevaCont = document.createElement("div");
        nuevaCont.className = "contPreg";

        let nuevaPreg = document.createElement("div");
        nuevaPreg.className = "preg";
        nuevaPreg.textContent = inpPreg.value;
        inpPreg.value = "";
        nuevaCont.appendChild(nuevaPreg);

        let nuevaSol =  inpSol.value;
        inpSol.value = "";

        let contOpc = document.createElement("div");
        contOpc.className = "contSol";

        inpOpcList.forEach(function(opc, i){
            console.log(opc.value);
            let nuevaOpc = document.createElement("div");
            if (i == nuevaSol){
                nuevaOpc.className = "sol";
            }else{
                nuevaOpc.className = "opc";
            }
            nuevaOpc.textContent = opc.value
            opc.value = ""
            contOpc.appendChild(nuevaOpc);
        })
        nuevaCont.appendChild(contOpc);
        
        document.querySelector(".contForm").appendChild(nuevaCont);
    }
});

document.querySelector(".butEnviar").addEventListener("click", ()=>{
    let pregList = document.querySelectorAll(".preg");
    let opcList = document.querySelectorAll(".contSol");
    let solList = document.querySelectorAll(".sol")

    let pregText = [];
    let opcListText = []
    let solText = [];

    pregList.forEach(function(preg, i){
        pregText.push(preg.innerHTML);
        solText.push(solList[i].innerHTML);

        let opcText = []
        
        opcList[i].querySelectorAll("div").forEach(opc =>{
            opcText.push(opc.innerHTML);
        });
        opcListText.push(opcText);  
    })

    socket.emit("FORM", [pregText, opcListText, solText]);
    
    window.location.href = "/inicio"
})