const p23 = document.getElementById("p23");
let premList = p23.getElementsByClassName("prem");

fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        
        let premios = data.premios;
        let ganadores = data.ganadores;
        premios.forEach(function(premio, i) {

            if (ganadores[i] != ""){
                let img = document.createElement('img');
                img.src = "../media/g23/"+ ganadores[i] +".png";
                premDiv = premList[i];
                premDiv.insertBefore(img, premDiv.firstChild);
            }
        });

    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));