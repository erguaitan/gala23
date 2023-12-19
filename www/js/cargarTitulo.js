let premio = localStorage.getItem("premio");

fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        let titulo = document.querySelector("h1");
        let premioId = data.premios.indexOf(premio);
        titulo.textContent = data.titulo[premioId];

        let video = document.querySelector("source");
        video.src = "../media/pres/"+ premio +".mp4"

    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));