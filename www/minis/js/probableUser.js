const socket = io('/premios23/probableUser');

const listaOpc = document.querySelector('.opcAcertar');
const divs = listaOpc.querySelectorAll('div');
const but = document.querySelector("button");

if(verCookie("usuario") == ""){
    window.location.href = "/premios23/login"
}else{
    socket.emit("NEWUSER", verCookie("usuario"));

    if (verCookie("num_probable") != "" && verCookie("preg_probable") != ""){
        document.querySelector(".contentAcertar").style.display = "flex";
        document.querySelector(".titulo").style.display = "none";
        document.querySelector(".contentAcertar").querySelector("h4").innerHTML = verCookie("num_probable");
        document.querySelector(".contentAcertar").querySelector("h6").innerHTML = verCookie("preg_probable");

        if (verCookie("probable") != ""){
            divs.forEach(opc =>{
                if (opc.innerHTML == verCookie("probable")){
                    opc.className = "activo";
                }
            })
        }
    }

    
    divs.forEach((div) => {
        div.addEventListener('click', function (event) {
            if (verCookie("probable") == ""){
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

        crearCookie("probable", opcUser);
        but.disabled = true;
    });
}


//RECIBIR SOCKET TITULO
socket.on("TITULO", ()=>{
    document.querySelector(".contentAcertar").style.display = "none";
    document.querySelector(".titulo").style.display = "flex";
    crearCookie("probable","");
    crearCookie("num_probable", "");
    crearCookie("preg_probable", "");
});
//RECIBIR SOCKET PREG
socket.on("PREG", (data)=>{
    document.querySelector(".contentAcertar").style.display = "flex";
    document.querySelector(".titulo").style.display = "none";

    document.querySelector(".contentAcertar").querySelector("h4").innerHTML = data[0];
    document.querySelector(".contentAcertar").querySelector("h6").innerHTML = data[1];

    crearCookie("probable","");
    crearCookie("num_probable", data[0]);
    crearCookie("preg_probable", data[1]);

    divs.forEach(opc =>{
        opc.className = "";
    })
});