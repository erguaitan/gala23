let premio = localStorage.getItem("premio");

let tituloNom = document.getElementById("nominados").querySelector("h3");
let nlist = document.querySelector(".nlist");

fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        let premioInd = data.premios.indexOf(premio);
        let titulo = data.titulo[premioInd] + " 2023";
        
        tituloNom.textContent = titulo;
        let lenNom = data.nominados[premioInd].length;

        data.nominados[premioInd].forEach(function(nominado, i) {
            const divElement = document.createElement("div");
            if(lenNom == 3){
                divElement.style.margin = "0 50px";
            }else{
                divElement.style.margin = "0 30px";
            }
            divElement.dataset.nom = i;
            divElement.addEventListener("click", ()=>{
                localStorage.setItem("url", "ganador")
                socket.emit("GANADOR", divElement.dataset.nom);
            });

            let nom = data.nomImg[premioInd][i];
            let imgElement = document.createElement("img");
            imgElement.src = "../media/g23/"+ nom +".png";
            

            let pElement = document.createElement("p");
            pElement.textContent = nominado;

            divElement.appendChild(imgElement);
            divElement.appendChild(pElement);
            nlist.appendChild(divElement);
        });

    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));