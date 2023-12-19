let url = window.location.pathname.substring(1, window.location.pathname.length -1);
const dir1 = ["inicio", "qr", "p23", "p22", "p21", "presNom", "nominados", "ganador"];
const dir2 = ["presNom", "nominados", "ganador"];
const dir3 = ["ganador"];

if (!localStorage.getItem("premio") && dir2.indexOf(url) != -1 ){
    window.location.href = "/p23";
}
if (!localStorage.getItem("ganador") && dir3.indexOf(url) != -1 ){
    window.location.href = "/presNom";
}