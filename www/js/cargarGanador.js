let premio = localStorage.getItem("premio");
let ganadorId = localStorage.getItem("ganador");

let imgGanador = document.getElementById("ganador").querySelector("img");
let titulo = document.getElementById("txtGanador").querySelector("h4");
let ganador = document.getElementById("txtGanador").querySelector("h3");

if (premio == "mvp"){
    titulo.style = "font-size: 6rem;"
    ganador.style = "font-size: 6rem;"
}

fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        
        let premioId = data.premios.indexOf(premio);
        imgGanador.src = "../media/g23/"+  data.nomImg[premioId][ganadorId] +".png";
        titulo.textContent = data.titulo[premioId];
        ganador.textContent = data.nominados[premioId][ganadorId];
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));