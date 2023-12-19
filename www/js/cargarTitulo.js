let premio = localStorage.getItem("premio");

fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        let titulo = document.querySelector("h1");
        let premioId = data.premios.indexOf(premio);
        titulo.textContent = data.titulo[premioId];

    

    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));