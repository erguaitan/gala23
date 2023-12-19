if (localStorage.getItem("mini") == null){
    localStorage.setItem("mini", "login");
}

let urlSend = localStorage.getItem("mini");

window.location.href = "/premios23/" + urlSend;