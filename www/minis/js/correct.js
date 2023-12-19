
if (verCookie("usuario")){
    
    document.querySelector("h2").textContent = verCookie("usuario");

    fetch("../user.json")
    .then(response => response.json())
    .then(data => {
        
        let user = data.user;
        let img = data.img;
        
        let idUser = user.indexOf(verCookie("usuario"))

        if (idUser == -1){
            crearCookie("usuario", "");
            window.location = window.location.origin+"/premios23/login";
        }

        document.querySelector(".correct").querySelector("div").style.backgroundImage = "url("+ img[idUser] +")"

    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));

    
    
}else{
    window.location = window.location.origin+"/premios23/login";
}
