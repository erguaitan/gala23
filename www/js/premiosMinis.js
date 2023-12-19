//QR
var qrcodeDiv = document.getElementById("qrcodePremiosMinis");
var urlQR;
if (window.location.pathname.substring(1, window.location.pathname.length -1) == "premios1Minis"){
    urlQR = window.location.origin + "/premios23/premios1";
}else if(window.location.pathname.substring(1, window.location.pathname.length -1) == "premios2Minis"){
    urlQR = window.location.origin + "/premios23/premios2";
}

var qrcode = new QRCode(qrcodeDiv, {
    text: urlQR,
    width: 150,
    height: 150, 
});


//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});
//RECIBE SOCKET ACCIÓN_PREMIOS
socket.on("ACCIÓN_PREMIOS", (act)=>{
    let userList = document.querySelectorAll(".users");
    userList.forEach(list => {
        if (act == "mostrar"){
            list.style.display = "flex";
        }else{
            list.style.display = "none";
        }
    });
});
//RECIBE SOCKET VOTAR
socket.on("VOTAR", (dataUser)=>{
    let premioVotado = document.querySelectorAll(".users")[dataUser[1]];
    fetch("../minis/user.json")
    .then(response => response.json())
    .then(data => {
        
        let idUser = data.user.indexOf(dataUser[0]);
        let img = data.img;

        let nuevoUser = document.createElement('div');
        nuevoUser.style.backgroundImage = 'url('+img[idUser]+')';
        premioVotado.appendChild(nuevoUser);
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));
});
