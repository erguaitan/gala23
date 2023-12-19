const socket = io('/premios23/acertarUser');

const listaOpc = document.querySelector('.opcAcertar');
const divs = listaOpc.querySelectorAll('div');
const but = document.querySelector("button");


if(verCookie("usuario") == ""){
    window.location.href = "/premios23/login"
}else{
    socket.emit("NEWUSER", verCookie("usuario"));

    if (verCookie("num_acertar") != "" && verCookie("preg_acertar") != ""){
        document.querySelector(".contentAcertar").style.display = "flex";
        document.querySelector(".titulo").style.display = "none";
        document.querySelector(".contentAcertar").querySelector("h4").innerHTML = verCookie("num_acertar");
        document.querySelector(".contentAcertar").querySelector("h6").innerHTML = verCookie("preg_acertar");

        if (verCookie("acertar") != "" && verCookie("res_acertar") == ""){
            divs.forEach(opc =>{

                if (opc.innerHTML == verCookie("acertar")){
                    opc.className = "activo";
                }
            })
        }

        if (verCookie("res_acertar") != ""){
            divs.forEach(opc =>{
                if (opc.innerHTML == verCookie("res_acertar")){
                    opc.className = "activo";
                }if (opc.innerHTML == verCookie("acertar") && opc.innerHTML != verCookie("res_acertar")){
                    opc.className = "error";
                }
            })
        }
    }

    divs.forEach((div) => {
        div.addEventListener('click', function (event) {
            if (verCookie("acertar") == ""){
                divs.forEach((div) => {
                    div.classList.remove('activo');
                });
                but.disabled = false;
                event.currentTarget.classList.add('activo');
            }
        });
    });

    but.addEventListener("click", ()=>{
        let opcUser;
        divs.forEach(opc =>{
            if(opc.className == "activo"){
                opcUser = opc.innerHTML;
            }
        });
    
        let userName = (verCookie("usuario"))
        socket.emit("VOTACION", [userName, opcUser]);

        crearCookie("acertar", opcUser);
        but.disabled = true;
    });
}

//RECIBIR SOCKET TITULO
socket.on("TITULO", ()=>{
    document.querySelector(".contentAcertar").style.display = "none";
    document.querySelector(".titulo").style.display = "flex";
    crearCookie("acertar","");
    crearCookie("num_acertar", "");
    crearCookie("preg_acertar", "");
    crearCookie("res_acertar", "");
});

socket.on("PREG", (data)=>{
    document.querySelector(".contentAcertar").style.display = "flex";
    document.querySelector(".titulo").style.display = "none";

    document.querySelector(".contentAcertar").querySelector("h4").innerHTML = data[0];
    document.querySelector(".contentAcertar").querySelector("h6").innerHTML = data[1];

    crearCookie("acertar","");
    crearCookie("num_acertar", data[0]);
    crearCookie("preg_acertar", data[1]);
    crearCookie("res_acertar", "");

    divs.forEach(opc =>{
        opc.className = "";
    })
});

socket.on("RESOL", (data)=>{
    document.querySelector(".contentAcertar").style.display = "flex";
    document.querySelector(".titulo").style.display = "none";

    document.querySelector(".contentAcertar").querySelector("h4").innerHTML = data[0];
    document.querySelector(".contentAcertar").querySelector("h6").innerHTML = data[1];

    crearCookie("num_acertar", data[0]);
    crearCookie("preg_acertar", data[1]);
    crearCookie("res_acertar", data[2]);

    divs.forEach(opc =>{
        if (opc.className == "activo" && opc.innerHTML != data[2]){
            opc.className = "error";
        }if (opc.innerHTML == data[2]){
            opc.className = "activo"
        }
    })
});