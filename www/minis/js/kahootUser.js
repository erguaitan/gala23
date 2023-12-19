const socket = io('/premios23/kahootUser');

const listaOpc = document.querySelector('.opcAcertar');
const divs = listaOpc.querySelectorAll('div');
const but = document.querySelector("button");


if(verCookie("usuario") == ""){
    window.location.href = "/premios23/login"
}else{
    socket.emit("NEWUSER", verCookie("usuario"));

    if (verCookie("num_kahoot") != "" && verCookie("preg_kahoot") != ""){
        document.querySelector(".contentAcertar").style.display = "flex";
        document.querySelector(".titulo").style.display = "none";
        document.querySelector(".contentAcertar").querySelector("h4").innerHTML = verCookie("num_kahoot");
        document.querySelector(".contentAcertar").querySelector("h6").innerHTML = verCookie("preg_kahoot");
        document.querySelector(".opcAcertar").querySelectorAll("div")[0].innerHTML = verCookie("1_opc");
        document.querySelector(".opcAcertar").querySelectorAll("div")[1].innerHTML = verCookie("2_opc");
        document.querySelector(".opcAcertar").querySelectorAll("div")[2].innerHTML = verCookie("3_opc");
        document.querySelector(".opcAcertar").querySelectorAll("div")[3].innerHTML = verCookie("4_opc");

        if (verCookie("kahoot") != "" && verCookie("res_kahoot") == ""){
            divs.forEach(opc =>{
                if (opc.innerHTML == verCookie("kahoot")){
                    opc.className = "activo";
                }
            })
        }

        if (verCookie("res_kahoot") != ""){
            divs.forEach(opc =>{
                if (opc.innerHTML == verCookie("res_kahoot")){
                    opc.className = "activo";
                }if (opc.innerHTML == verCookie("kahoot") && opc.innerHTML != verCookie("res_kahoot")){
                    opc.className = "error";
                }
            })
        }
    }

    divs.forEach((div) => {
        div.addEventListener('click', function (event) {
            if (verCookie("kahoot") == ""){
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
        let listCookOpc = [verCookie("1_opc"), verCookie("2_opc"), verCookie("3_opc"), verCookie("4_opc")]
        socket.emit("VOTACION", [userName, opcUser, listCookOpc.indexOf(opcUser)]);

        crearCookie("kahoot", opcUser);
        but.disabled = true;
    });
}

//RECIBIR SOCKET TITULO
socket.on("TITULO", ()=>{
    document.querySelector(".contentAcertar").style.display = "none";
    document.querySelector(".titulo").style.display = "flex";
    crearCookie("kahoot","");
    crearCookie("num_kahoot", "");
    crearCookie("preg_kahoot", "");
    crearCookie("res_kahoot", "");
    crearCookie("1_opc", "");
    crearCookie("2_opc", "");
    crearCookie("3_opc", "");
    crearCookie("4_opc", "");
});

socket.on("PREG", (data)=>{
    document.querySelector(".contentAcertar").style.display = "flex";
    document.querySelector(".titulo").style.display = "none";

    document.querySelector(".contentAcertar").querySelector("h4").innerHTML = data[0];
    document.querySelector(".contentAcertar").querySelector("h6").innerHTML = data[1];
    document.querySelector(".opcAcertar").querySelectorAll("div")[0].innerHTML = data[2][0];
    document.querySelector(".opcAcertar").querySelectorAll("div")[1].innerHTML = data[2][1];
    document.querySelector(".opcAcertar").querySelectorAll("div")[2].innerHTML = data[2][2];
    document.querySelector(".opcAcertar").querySelectorAll("div")[3].innerHTML = data[2][3];

    crearCookie("kahoot","");
    crearCookie("num_kahoot", data[0]);
    crearCookie("preg_kahoot", data[1]);
    crearCookie("1_opc", data[2][0]);
    crearCookie("2_opc", data[2][1]);
    crearCookie("3_opc", data[2][2]);
    crearCookie("4_opc", data[2][3]);
    crearCookie("res_kahoot", "");

    divs.forEach(opc =>{
        opc.className = "";
    })
});

socket.on("RESOL", (data)=>{
    document.querySelector(".contentAcertar").style.display = "flex";
    document.querySelector(".titulo").style.display = "none";

    document.querySelector(".contentAcertar").querySelector("h4").innerHTML = data[0];
    document.querySelector(".contentAcertar").querySelector("h6").innerHTML = data[1];

    crearCookie("num_kahoot", data[0]);
    crearCookie("preg_kahoot", data[1]);
    crearCookie("res_kahoot", data[2]);

    divs.forEach(opc =>{
        if (opc.className == "activo" && opc.innerHTML != data[2]){
            opc.className = "error";
        }if (opc.innerHTML == data[2]){
            opc.className = "activo"
        }
    })
});