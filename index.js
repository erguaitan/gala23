const express = require('express'); //npm install express
const app = express();
const path = require('path');
const server = require("http").Server(app);
const io = require("socket.io")(server); //npm install socket.io
const fs = require('fs');


app.use('/', express.static(path.join(__dirname, 'www')));
app.use('/inicio', express.static(path.join(__dirname, 'www/vistas'), { index: 'inicio.html' }));
app.use('/p23', express.static(path.join(__dirname, 'www/vistas'), { index: 'p23.html' }));
app.use('/p22', express.static(path.join(__dirname, 'www/vistas'), { index: 'p22.html' }));
app.use('/p21', express.static(path.join(__dirname, 'www/vistas'), { index: 'p21.html' }));
app.use('/presNom', express.static(path.join(__dirname, 'www/vistas'), { index: 'presNom.html' }));
app.use('/nominados', express.static(path.join(__dirname, 'www/vistas'), { index: 'nominados.html' }));
app.use('/ganador', express.static(path.join(__dirname, 'www/vistas'), { index: 'ganador.html' }));
app.use('/pointer', express.static(path.join(__dirname, 'www/pointer/vistas'), { index: 'index.html' }));
app.use('/qr', express.static(path.join(__dirname, 'www/vistas'), { index: 'qr.html' }));
app.use('/formAcertar', express.static(path.join(__dirname, 'www/vistas'), { index: 'formAcertar.html' }));
app.use('/formProbable', express.static(path.join(__dirname, 'www/vistas'), { index: 'formProbable.html' }));
app.use('/formKahoot', express.static(path.join(__dirname, 'www/vistas'), { index: 'formKahoot.html' }));
app.use('/premios1Minis', express.static(path.join(__dirname, 'www/vistas'), { index: 'premios1Minis.html' }));
app.use('/premios2Minis', express.static(path.join(__dirname, 'www/vistas'), { index: 'premios2Minis.html' }));
app.use('/acertarMinis', express.static(path.join(__dirname, 'www/vistas'), { index: 'acertarMinis.html' }));
app.use('/probableMinis', express.static(path.join(__dirname, 'www/vistas'), { index: 'probableMinis.html' }));
app.use('/kahootMinis', express.static(path.join(__dirname, 'www/vistas'), { index: 'kahootMinis.html' }));
app.use('/gala23', express.static(path.join(__dirname, 'www/vistas'), { index: 'gala23.html' }));
app.use('/premios23', express.static(path.join(__dirname, 'www/minis')));
app.use('/premios23/login', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'loginUser.html' }));
app.use('/premios23/wait', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'wait.html' }));
app.use('/premios23/premios1', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'premios1User.html' }));
app.use('/premios23/premios2', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'premios2User.html' }));
app.use('/premios23/correct', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'correct.html' }));
app.use('/premios23/acertarUser', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'acertarUser.html' }));
app.use('/premios23/probableUser', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'probableUser.html' }));
app.use('/premios23/kahootUser', express.static(path.join(__dirname, 'www/minis/vistas'), { index: 'kahootUser.html' }));


//INICIO
io.of("/inicio").on("connection", (socket) => {
    socket.on("CAMBIO", (url) => {
        console.log("/inicio - CAMBIO - "+url);
        io.of("/inicio").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
});
//QR
io.of("/qr").on("connection", (socket) => {
    socket.on("CAMBIO", (url) => {
        console.log("/qr - CAMBIO - "+url);
        io.of("/qr").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
    socket.on("RESETUSER", () => {
        console.log("RESETUSER");
        const jsonFilePath = "www/minis/user.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }

            const jsonData = JSON.parse(data);
            jsonData.user = [];
            jsonData.img = [];
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });
    });
});
//P23
io.of("/p23").on("connection", (socket) => {
    socket.on("PRESNOM", (premio) => {
        console.log("/p23 - PRESNOM - "+premio);
        io.of("/p23").emit("PRESNOM", premio);
        io.of("/pointer").emit("PRESNOM", premio);
    });
    socket.on("CAMBIO", (url) => {
        console.log("/p23 - CAMBIO - "+url);
        io.of("/p23").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
    socket.on("RESETGANADOR", () => {
        console.log("RESETGANADOR");
        const jsonFilePath = "www/data.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }

            const jsonData = JSON.parse(data);
            jsonData.ganadores = ["","","","","","","","","","","","","","",""];
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });
    });
});
//P22
io.of("/p22").on("connection", (socket) => {
    socket.on("CAMBIO", (url) => {
        console.log("/p22 - CAMBIO - "+url);
        io.of("/p22").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
});
//P21
io.of("/p21").on("connection", (socket) => {
    socket.on("CAMBIO", (url) => {
        console.log("/p21 - CAMBIO - "+url);
        io.of("/p21").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
});
//PRESNOM
io.of("/presNom").on("connection", (socket) => {
    socket.on("CAMBIO", (url) => {
        console.log("/presNom - CAMBIO - "+url);
        io.of("/presNom").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
});
//NOMINADOS
io.of("/nominados").on("connection", (socket) => {
    socket.on("GANADOR", (nominado) => {
        console.log("/nominados - GANADOR - "+ nominado);
        io.of("/nominados").emit("GANADOR", nominado);
        io.of("/pointer").emit("GANADOR", nominado);
    });
    socket.on("CAMBIO", (url) => {
        console.log("/nominados - CAMBIO - "+url);
        io.of("/nominados").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
});
//GANADOR
io.of("/ganador").on("connection", (socket) => {
    socket.on("CAMBIO", (url) => {
        console.log("/ganador - CAMBIO - "+url);
        io.of("/ganador").emit("CAMBIO", url);
        io.of("/pointer").emit("CAMBIO", url);
    });
    socket.on("ACTUALIZAR", (dataSocket) => {
        console.log("ACTUALIZAR");
        const jsonFilePath = "www/data.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }

            const jsonData = JSON.parse(data);
            let premioID = jsonData.premios.indexOf(dataSocket[0]);
            jsonData.ganadores[premioID] = jsonData.nomImg[premioID][dataSocket[1]];
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });
    });
});
//ACERTARMINIS
io.of("/acertarMinis").on("connection", (socket) => {
    socket.on("TITULO", () => {
        console.log("/acertarMinis - TITULO");
        io.of("/premios23/acertarUser").emit("TITULO");
    });
    socket.on("PREG", (dataPreg) => {
        console.log("/acertarMinis - PREG - "+ dataPreg[0]);
        io.of("/premios23/acertarUser").emit("PREG", dataPreg);
    });
    socket.on("RESOL", (dataPreg) => {
        console.log("/acertarMinis - RESOL - "+ dataPreg[0]);
        io.of("/premios23/acertarUser").emit("RESOL", dataPreg);
    });
});
//PROBABLEMINIS
io.of("/probableMinis").on("connection", (socket) => {
    socket.on("TITULO", () => {
        console.log("/probableMinis - TITULO");
        io.of("/premios23/probableUser").emit("TITULO");
    });
    socket.on("PREG", (dataPreg) => {
        console.log("/probableMinis - PREG - "+ dataPreg[0]);
        io.of("/premios23/probableUser").emit("PREG", dataPreg);
    });
});
//KAHOOTMINIS
io.of("/kahootMinis").on("connection", (socket) => {
    socket.on("TITULO", () => {
        console.log("/kahootMinis - TITULO");
        io.of("/premios23/kahootUser").emit("TITULO");
    });
    socket.on("PREG", (dataPreg) => {
        console.log("/kahootMinis - PREG - "+ dataPreg[0]);
        io.of("/premios23/kahootUser").emit("PREG", dataPreg);
    });
    socket.on("RESOL", (dataPreg) => {
        console.log("/kahootMinis - RESOL - "+ dataPreg[0]);
        io.of("/premios23/kahootUser").emit("RESOL", dataPreg);
    });
});
//POINTER
io.of("/pointer").on("connection", (socket) => {
    socket.on("CAMBIO", (url) => {
        console.log("/pointer - CAMBIO - "+ url);
        io.of("/pointer").emit("CAMBIO", url);
        io.of("/inicio").emit("CAMBIO", url);
        io.of("/qr").emit("CAMBIO", url);
        io.of("/p23").emit("CAMBIO", url);
        io.of("/p22").emit("CAMBIO", url);
        io.of("/p21").emit("CAMBIO", url);
        io.of("/presNom").emit("CAMBIO", url);
        io.of("/nominados").emit("CAMBIO", url);
        io.of("/ganador").emit("CAMBIO", url);
        io.of("/premios1Minis").emit("CAMBIO", url);
        io.of("/premios2Minis").emit("CAMBIO", url);
        io.of("/acertarMinis").emit("CAMBIO", url);
        io.of("/probableMinis").emit("CAMBIO", url);
        io.of("/kahootMinis").emit("CAMBIO", url);

        const jsonFilePath = "www/minis.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }
            let urlCurrent;
            const jsonData = JSON.parse(data);
            
            if(url == "premios1Minis"){
                urlCurrent = "premios1";
            }else if (url == "premios2Minis"){
                urlCurrent = "premios2";
            }else if (url == "probableMinis"){
                urlCurrent = "probableUser";
            }else if (url == "acertarMinis"){
                urlCurrent = "acertarUser";
            }else if (url == "kahootMinis"){
                urlCurrent = "kahootUser";
            }else{
                urlCurrent = "login";
            }

            jsonData.current = urlCurrent;
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });
    });
    socket.on("PRESNOM", (premio) => {
        console.log("/pointer - PRESNOM - "+ premio);
        io.of("/pointer").emit("PRESNOM", premio);
        io.of("/p23").emit("PRESNOM", premio);
    });
    socket.on("GANADOR", (nominado) => {
        console.log("/pointer - GANADOR - "+ nominado);
        io.of("/pointer").emit("GANADOR", nominado);
        io.of("/nominados").emit("GANADOR", nominado);
    });
    socket.on("VIDP23", (estado) => {
        console.log("/pointer - VIDP23 - "+ estado);
        io.of("/inicio").emit("VIDP23", estado);
        io.of("/presNom").emit("VIDP23", estado);
    });
    /*
    socket.on("PLAYP23", (estado) => {
        console.log("/pointer - PLAYP23 - "+ estado);
        io.of("/inicio").emit("PLAYP23", estado);
        io.of("/presNom").emit("PLAYP23", estado);
    });
    */
    socket.on("ACCIÓN_PREMIOS", (act) => {
        console.log("/pointer - ACCIÓN_PREMIOS - "+ act);
        io.of("/premios1Minis").emit("ACCIÓN_PREMIOS", act);
        io.of("/premios2Minis").emit("ACCIÓN_PREMIOS", act);
    });
    socket.on("ACCIÓN_ACERTAR", (act) => {
        console.log("/pointer - ACCIÓN_ACERTAR - "+ act);
        io.of("/acertarMinis").emit("ACCIÓN_ACERTAR", act);
    });
    socket.on("ACCIÓN_PROBABLE", (act) => {
        console.log("/pointer - ACCIÓN_PROBABLE - "+ act);
        io.of("/probableMinis").emit("ACCIÓN_PROBABLE", act);
    });
    socket.on("ACCIÓN_KAHOOT", (act) => {
        console.log("/pointer - ACCIÓN_KAHOOT - "+ act);
        io.of("/kahootMinis").emit("ACCIÓN_KAHOOT", act);
    });
});
//FORMACERTAR
io.of("/formAcertar").on("connection", (socket) => {
    socket.on("FORM", (dataAcertar) => {
        console.log("FORMACERTAR");
        const jsonFilePath = "www/minis.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }

            let pregAcertarList = [];
            let solAcertarList = [];

            const jsonData = JSON.parse(data);
            dataAcertar[0].forEach(function(preg, i) {
                pregAcertarList.push(preg);
                solAcertarList.push(dataAcertar[1][i]);
            });

            jsonData.pregAcertar = pregAcertarList;
            jsonData.solAcertar = solAcertarList;
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });
    });
});
//FORMPROBABLE
io.of("/formProbable").on("connection", (socket) => {
    socket.on("FORM", (dataProbable) => {
        console.log("FORMPROBABLE");
        const jsonFilePath = "www/minis.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }

            let pregProbableList = [];

            const jsonData = JSON.parse(data);
            dataProbable.forEach(function(preg, i) {
                pregProbableList.push(preg);
            });

            jsonData.pregProbable = pregProbableList;
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });
    });
});
//FORMKAHOOT
io.of("/formKahoot").on("connection", (socket) => {
    socket.on("FORM", (dataKahoot) => {
        console.log("FORMKAHOOT");
        const jsonFilePath = "www/minis.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }

            let pregKahootList = [];
            let opcKahootList = [];
            let solKahootList = [];

            const jsonData = JSON.parse(data);
            dataKahoot[0].forEach(function(preg, i) {
                pregKahootList.push(preg)
                opcKahootList.push(dataKahoot[1][i])
                solKahootList.push(dataKahoot[2][i])
            });

            jsonData.pregKahoot = pregKahootList;
            jsonData.opcKahoot = opcKahootList;
            jsonData.solKahoot = solKahootList;
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });
    });
});
//PREMIOS23/LOGIN
io.of("/premios23/login").on("connection", (socket) => {
    socket.on("USERNEW", (dataUser) => {
        console.log("/premios23/login - USERNEW - " + dataUser[1]);

        /*guardar data en el json*/
        const jsonFilePath = "www/minis/user.json";
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON', err);
                return;
            }

            const jsonData = JSON.parse(data);
            jsonData.user.push(dataUser[1]);
            jsonData.img.push(dataUser[0]);
        
            const newData = JSON.stringify(jsonData, null, 2);
        
            fs.writeFile(jsonFilePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON', err);
                return;
                }
            });
        });

        io.of("/qr").emit("USERNEW", dataUser);
    });
});
//PREMIOS23/PREMIOS1
io.of("/premios23/premios1").on("connection", (socket) => {
    socket.on("VOTAR", (data) => {
        console.log("/premios23/premios1 - VOTAR - "+ data[0]+", "+data[1]);
        io.of("/premios1Minis").emit("VOTAR", data);
    });
});
//PREMIOS23/PREMIOS2
io.of("/premios23/premios2").on("connection", (socket) => {
    socket.on("VOTAR", (data) => {
        console.log("/premios23/premios2 - VOTAR - "+ data[0]+", "+data[1]);
        io.of("/premios2Minis").emit("VOTAR", data);
    });
});
//PREMIOS23/ACERTARUSER
io.of("/premios23/acertarUser").on("connection", (socket) => {
    socket.on("VOTACION", (data) => {
        console.log("/premios23/acertarUser - VOTACION - "+ data[0]+", "+data[1]);
        io.of("/acertarMinis").emit("VOTACION", data);
    });
    socket.on("NEWUSER", (data) => {
        console.log("/premios23/acertarUser - NEWUSER - "+ data);
        io.of("/acertarMinis").emit("NEWUSER", data);
    });
});
//PREMIOS23/PROBABLEUSER
io.of("/premios23/probableUser").on("connection", (socket) => {
    socket.on("VOTACION", (data) => {
        console.log("/premios23/probableUser - VOTACION - "+ data[0]+", "+data[1]);
        io.of("/probableMinis").emit("VOTACION", data);
    });
    socket.on("NEWUSER", (data) => {
        console.log("/premios23/probableUser - NEWUSER - "+ data);
        io.of("/probableMinis").emit("NEWUSER", data);
    });
});
//PREMIOS23/KAHOOTUSER
io.of("/premios23/kahootUser").on("connection", (socket) => {
    socket.on("VOTACION", (data) => {
        console.log("/premios23/kahootUser - VOTACION - "+ data[0]+", "+data[1]);
        io.of("/kahootMinis").emit("VOTACION", data);
    });
    socket.on("NEWUSER", (data) => {
        console.log("/premios23/kahootUser - NEWUSER - "+ data);
        io.of("/kahootMinis").emit("NEWUSER", data);
    });
});

server.listen(3000, () => console.log('server started'));