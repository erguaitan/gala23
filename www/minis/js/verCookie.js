//VER VALOR DE COOKIE
function verCookie(valor){
    var val = valor+"=";
    var array = document.cookie.split(";");
    for (var i=0; i<array.length; i++){
        var c = array[i].trim();
        if (c.indexOf(valor)==0){
        return c.substring(val.length, c.length);
        }
    }
    return "";
}

function crearCookie(nombre, valor) {
    let minutos = 120;
    var fecha = new Date();
    fecha.setTime(fecha.getTime() + (minutos * 60 * 1000)); // Convierte minutos a milisegundos

    var expiracion = "expires=" + fecha.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/premios23";
}