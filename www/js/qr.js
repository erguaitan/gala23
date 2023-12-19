const socket = io('/qr');
localStorage.removeItem("premio");
localStorage.removeItem("ganador");
localStorage.setItem("url", 'qr');


//LOADER
window.addEventListener("load", function() {
    document.querySelector(".loaderContent").style.display = "none";
});

//QR
var qrcodeDiv = document.getElementById("qrcode");
var urlQR = window.location.origin + "/premios23/login";
var qrcode = new QRCode(qrcodeDiv, {
    text: urlQR,
    width: 150,
    height: 150, 
});

//USERS
fetch("../minis/user.json")
    .then(response => response.json())
    .then(data => {
        
        let users = data.user;
        let img = data.img;
        
        users.forEach(function(user, i) {
            let contentUsers = document.querySelector(".contentUsers")
            var newDiv = document.createElement('div');
            newDiv.classList.add('user');

            var innerDiv = document.createElement('div');
            innerDiv.style.backgroundImage = 'url(' + img[i] + ')';
            newDiv.appendChild(innerDiv);

            var paragraph = document.createElement('p');
            paragraph.textContent = user;
            newDiv.appendChild(paragraph);

            contentUsers.appendChild(newDiv);
        });

    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));


//ENVIA SOCKET CAMBIO
document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowLeft") {
        socket.emit("CAMBIO","inicio");
        localStorage.setItem("url", 'inicio');
    }else if (event.code === "ArrowRight"){
        socket.emit("CAMBIO","inicio");
        localStorage.setItem("url", 'inicio');
    }
    else if (event.code === "KeyR"){
        socket.emit("RESETUSER");
        window.location.href = "/qr";
    }
});

//RECIBE SOCKET CAMBIO
socket.on("CAMBIO", (url)=>{
    window.location.href = '/'+url;
});
//RECIBE SOCKET USER
socket.on("USERNEW", (data)=>{
    let contentUsers = document.querySelector(".contentUsers")
    var newDiv = document.createElement('div');
    newDiv.classList.add('user');

    var innerDiv = document.createElement('div');
    innerDiv.style.backgroundImage = 'url(' + data[0] + ')';
    newDiv.appendChild(innerDiv);

    var paragraph = document.createElement('p');
    paragraph.textContent = data[1];
    newDiv.appendChild(paragraph);

    contentUsers.appendChild(newDiv);
});