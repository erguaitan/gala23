const listaPremiosUser = document.querySelector('.listaPremiosUser');
const divs = listaPremiosUser.querySelectorAll('div');
const but = document.querySelector("button");
let premioSelected = "";

if(verCookie("usuario") == ""){
    window.location.href = "/premios23/login"
}else if (verCookie(window.location.pathname.substring(11, window.location.pathname.length -1)) != ""){
    window.location.href = "/premios23/correct"
}else{
    divs.forEach((div) => {
        div.addEventListener('click', function (event) {
            divs.forEach((div) => {
                div.classList.remove('activo');
            });
            but.disabled = false;
            event.currentTarget.classList.add('activo');
        });
    });
    
    but.addEventListener("click", ()=>{
        let id;
        document.querySelector(".listaPremiosUser").querySelectorAll("div").forEach(premio =>{
            if(premio.className == "activo"){
                id = premio.dataset.id;
            }
        });
    
        let userName = (verCookie("usuario"))
        socket.emit("VOTAR", [userName, id]);
    

        crearCookie(window.location.pathname.substring(11, window.location.pathname.length -1), id);
        window.location.href = "/premios23/correct"
    });
}