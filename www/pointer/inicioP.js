const socket = io('/pointer');

const dir = {
    "login": ["inicio"],
    "inicio": ["p23","p22","p21","qr", "vid1", "vid2"],
    "qr": ["inicio"],
    "p23": ["inicio","p22","p21","presNom", "minis"],
    "p22": ["inicio","p23","p21"],
    "p21": ["inicio","p23","p22"],
    "presNom": ["inicio","p23","nominados", "vid1", "vid2"],
    "nominados": ["p23","presNom","ganador"],
    "ganador": ["inicio","p23","nominados"],
    "premios1" : ["p23", "mostrar", "ocultar"],
    "premios2" : ["p23", "mostrar", "ocultar"],
    "probable" : ["p23", "titulo", "sig", "ant", "votar"],
    "acertar" : ["p23", "titulo", "sig", "ant", "votar", "resol"],
    "kahoot" : ["p23", "titulo", "sig", "ant", "votar", "resol"]
}

if (!localStorage.getItem("url")){
    localStorage.setItem("url", "inicio")
}
let url = localStorage.getItem("url");

let gridCont = document.querySelector(".gridCont")

dir[url].forEach(opc => {
    if ((url == "p23" || url == "inicio") && opc == "presNom"){
        cargaPremios();
    }else if (url == "nominados" && opc == "ganador"){
        cargarNominados();
    }else if ((url == "premios1" || url == "premios2") && opc != "p23"){
        let nuevaAct = document.createElement('div');
        nuevaAct.className = 'gridItem';
        nuevaAct.classList.add("nom")
        nuevaAct.textContent = opc;
        nuevaAct.addEventListener("click", ()=>{
            socket.emit("ACCIÓN_PREMIOS", opc);
        });
        gridCont.appendChild(nuevaAct);
    }else if (url == "acertar" && opc != "p23"){
        let nuevaAct = document.createElement('div');
        nuevaAct.className = 'gridItem';
        nuevaAct.classList.add("nom")
        nuevaAct.textContent = opc;
        nuevaAct.addEventListener("click", ()=>{
            socket.emit("ACCIÓN_ACERTAR", opc);
        });
        gridCont.appendChild(nuevaAct);
    }else if (url == "probable" && opc != "p23"){
        let nuevaAct = document.createElement('div');
        nuevaAct.className = 'gridItem';
        nuevaAct.classList.add("nom")
        nuevaAct.textContent = opc;
        nuevaAct.addEventListener("click", ()=>{
            socket.emit("ACCIÓN_PROBABLE", opc);
        });
        gridCont.appendChild(nuevaAct);
    }else if (url == "kahoot" && opc != "p23"){
        let nuevaAct = document.createElement('div');
        nuevaAct.className = 'gridItem';
        nuevaAct.classList.add("nom")
        nuevaAct.textContent = opc;
        nuevaAct.addEventListener("click", ()=>{
            socket.emit("ACCIÓN_KAHOOT", opc);
        });
        gridCont.appendChild(nuevaAct);
    }else{
        let nuevoDiv = document.createElement('div');
        nuevoDiv.className = 'gridItem';
        if (opc.substring(0,3) == "vid"){
            nuevoDiv.textContent = opc;
            nuevoDiv.addEventListener("click", (e) =>{
                socket.emit("VIDP23", opc)
            });
            gridCont.appendChild(nuevoDiv); 
        }else if( opc == "minis"){
            let minisList = ["premios1", "premios2", "probable", "acertar", "kahoot"];
            minisList.forEach(function(mini, i) {
                let nuevoMini = document.createElement('div');
                nuevoMini.className = 'gridItem';
                nuevoMini.classList.add("minis")
                nuevoMini.textContent = mini;
                nuevoMini.addEventListener("click", ()=>{
                    localStorage.setItem("url", mini);
                    socket.emit("CAMBIO", mini+"Minis");
                });
                gridCont.appendChild(nuevoMini);
            });
        }else{
            nuevoDiv.textContent = opc;
            nuevoDiv.addEventListener("click", () =>{
                localStorage.setItem("url", opc);
                socket.emit("CAMBIO", opc)
            });
            gridCont.appendChild(nuevoDiv); 
        }  
    }
});


//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/pointer';
});
socket.on("PRESNOM", (url)=>{
    window.location.href = '/pointer';
});
socket.on("GANADOR", (url)=>{
    window.location.href = '/pointer';
});


function cargaPremios(){
    fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        
        data.ganadores.forEach(function(prem,i) {
            if (prem == ""){
                console.log("a")
                let nuevoDiv = document.createElement('div');
                nuevoDiv.className = 'gridItem';
                nuevoDiv.classList.add("nom")
                nuevoDiv.textContent = data.premios[i];
                nuevoDiv.addEventListener("click", ()=>{
                    localStorage.setItem("url","presNom");
                    localStorage.setItem("premio",data.premios[i]);
                    socket.emit("PRESNOM", data.premios[i]);
                });
                gridCont.appendChild(nuevoDiv);
            }
        })
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));
}

function cargarNominados(){
    fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        let premioID = data.premios.indexOf(localStorage.getItem("premio"));

        data.nominados[premioID].forEach ( function(nominado, i){
            let nuevoDiv = document.createElement('div');
            nuevoDiv.className = 'gridItem';
            nuevoDiv.classList.add("nom")
            nuevoDiv.textContent = nominado;
            nuevoDiv.dataset.nom = i;
            nuevoDiv.addEventListener("click", ()=>{
                localStorage.setItem("url","ganador");
                socket.emit("GANADOR", i);
            });
            gridCont.appendChild(nuevoDiv);
        })
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));
}