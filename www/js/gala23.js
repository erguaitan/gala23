/*
if (localStorage.getItem("mini") == null){
    localStorage.setItem("mini", "login");
}

let urlSend = localStorage.getItem("mini");

window.location.href = "/premios23/" + urlSend;
*/


fetch("../minis.json")
.then(response => response.json())
.then(data => {
    let urlSend = data.current;
    
    window.location.href = "/premios23/" + urlSend;
    
})
.catch(error => console.error("Error al cargar el archivo JSON: " + error));