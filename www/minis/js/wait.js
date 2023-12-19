const intervalo = setInterval(async () => {
    fetch("../user.json")
    .then(response => response.json())
    .then(data => {
        let userList = data.user;
        
        if (userList.indexOf(verCookie("usuario")) != -1){
            window.location.href ="/premios23/correct";
        }
        
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));

    
}, 500);

setTimeout(() => {
    clearInterval(intervalo);
    console.log('Intervalo detenido después de 30 segundos');
    crearCookie("usuario", "");
    window.location.href ="/premios23/login";

}, 15000);