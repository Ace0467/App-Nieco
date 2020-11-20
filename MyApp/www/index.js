let fotoSrc;

function confirmarPlayerOne() {

    if (document.getElementById("name").value === "" || document.getElementById("nick").value === "") {

        alert("Datos incompletos");

    } else if (document.getElementById("name").value != "" && document.getElementById("nick").value != "") {

        if (document.getElementById("colorSec").value === "#0000ff" || document.getElementById("colorSec").value === "#ffffff") {

            alert("¡Cambie el color!");

        } else {

            if (document.getElementById("foto").src === "") {

                alert("Tomate una foto por favor! No tengas miedo!");

            } else {

                let perfil1 = {

                    nombre: document.getElementById("name").value,
                    nick: document.getElementById("nick").value,
                    color: document.getElementById("colorSec").value,
                    foto: document.getElementById("foto").src,
                    points: 0

                }
                Storage.put("p1", perfil1);
                window.location.href = "playertwo.html";

            }



        }

    }

}

function confirmarPlayerTwo() {

    if (document.getElementById("name2").value === "" || document.getElementById("nick2").value === "") {

        alert("Datos incompletos");

    } else if (document.getElementById("name2").value != "" && document.getElementById("nick2").value != "") {

        if (document.getElementById("colorSec2").value === Storage.get("p1").color || document.getElementById("colorSec2").value === "#0000ff" || document.getElementById("colorSec2").value === "#ffffff") {

            alert("¡Cambie el color!");

        } else {

            if (document.getElementById("foto").src === "") {

                alert("Tomate una foto por favor! No tengas miedo!");

            } else {

            let perfil2 = {

                nombre: document.getElementById("name2").value,
                nick: document.getElementById("nick2").value,
                color: document.getElementById("colorSec2").value,
                points: 0,
                foto: document.getElementById("foto").src

            }

            Storage.put("p2", perfil2);
            window.location.href = "juegos.html";

        }

    }

    }

}

function loadGames() {

    document.getElementById("jug1").innerHTML = Storage.get("p1").nick + " " + Storage.get("p1").points + " puntos";
    document.getElementById("jug1").style.color = Storage.get("p1").color;
    document.getElementById("jug2").innerHTML = Storage.get("p2").nick + " " + Storage.get("p2").points;
    document.getElementById("jug2").style.color = Storage.get("p2").color;

}

function loadConfig() {

    document.getElementById("conf1").innerHTML = "Modificar perfil 1: " + Storage.get("p1").nick;
    document.getElementById("conf2").innerHTML = "Modificar perfil 2: " + Storage.get("p2").nick;

}

function checkProfile() {

    if (Storage.get("p1") != null && Storage.get("p2") != null) {

        window.location.href = "juegos.html";

    } else {

        Storage.kill();

    }

}


function p1Values() {

    document.getElementById("name1config").value = Storage.get("p1").nombre;
    document.getElementById("nick1config").value = Storage.get("p1").nick;
    document.getElementById("colorSec1config").value = Storage.get("p1").color;
    document.getElementById("foto").src = Storage.get("p1").foto;

}

function confirmP1Values() {

    if (document.getElementById("colorSec1config").value === Storage.get("color2") || document.getElementById("colorSec1config").value === "#0000ff" || document.getElementById("colorSec1config").value === "#ffffff") {

        alert("¡Cambie el color!");

    } else {

        let perfil1 = {

            nombre: document.getElementById("name1config").value,
            nick: document.getElementById("nick1config").value,
            color: document.getElementById("colorSec1config").value,
            foto: document.getElementById("foto").src,
            points: 0

        }
        
        Storage.put("p1", perfil1);
        window.location.href = "juegos.html";

    }

}

function p2Values() {

    document.getElementById("name2config").value = Storage.get("p2").nombre;
    document.getElementById("nick2config").value = Storage.get("p2").nick;
    document.getElementById("colorSec2config").value = Storage.get("p2").color;
    document.getElementById("foto").src = Storage.get("p2").foto;

}

function confirmP2Values() {

    if (document.getElementById("colorSec2config").value === Storage.get("p1").color || document.getElementById("colorSec2config").value === "#0000ff" || document.getElementById("colorSec2config").value === "#ffffff") {

        alert("¡Cambie el color!");

    } else {

        let perfil2 = {

            nombre: document.getElementById("name2config").value,
            nick: document.getElementById("nick2config").value,
            color: document.getElementById("colorSec2config").value,
            points: 0,
            foto: document.getElementById("foto").src

        }

        Storage.put("p2", perfil2);
        window.location.href = "juegos.html";

    }

}

function killStorage() {

    Storage.kill();
    window.location.href = "index.html";

}

function takePicture() {

    let cameraOps = {

        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL

    }

    navigator.camera.getPicture(onSuccess, onFail, cameraOps);

}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("device ready");
    // document.getElementById("foto").addEventListener("click", cameraTakePicture);
}

function onSuccess(imgData) {

    document.getElementById("foto").src = "data:image/jpeg;base64," + imgData;

}

function onFail(message) {
    alert('Failed because: ' + message);
}