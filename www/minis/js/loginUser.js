const socket = io('/premios23/login');

if (verCookie("usuario")!= ""){
    window.location.href = "/premios23/wait"
}else{
    document.getElementById('inpUser').addEventListener('input', function() {
        // Obtén el valor actual del input
        var valorInput = this.value;
    
        // Limita la longitud a 10 caracteres
        if (valorInput.length > 10) {
          // Si se supera la longitud permitida, corta el texto
            this.value = valorInput.slice(0, 10);
        }
    });


    document.getElementById("butSend").addEventListener("click", (e)=>{
        
        let userInput = document.getElementById("inpUser").value;
        userInput = userInput.trim();
        let imgInput = document.getElementById("inpImg").files[0];


        fetch("../user.json")
        .then(response => response.json())
        .then(data => {
            let userList = data.user;
            userInput = userInput.trim();
            if (userInput.trim() != "" && imgInput && userList.indexOf(userInput) == -1){
                const reader = new FileReader();
    
                reader.onload = function(event) {
                    const imageData = event.target.result;
                    socket.emit("USERNEW",[imageData, userInput]);
                
                };
                reader.readAsDataURL(imgInput);
    
                crearCookie("usuario", userInput);
                window.location.href ="/premios23/wait";
            }
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));

    });
    
    document.getElementById("inpImg").addEventListener('change', function (e) {
        
        const file = e.target.files[0];
        
        if (file) {
            if (file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                document.querySelector(".imgUser").style = "background-image:url('"+imageUrl+"');";
            } else {
                alert('Por favor, selecciona un archivo de imagen válido.');
                document.getElementById("inpImg").value = ''; 
            }
        }
    });
}


