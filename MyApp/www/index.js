let fotoSrc;

document.addEventListener("deviceready", onDeviceReady, false);

function confirmarPlayer() {

    if (document.getElementById("name").value === "" || document.getElementById("nick").value === "") {

        alert("Datos incompletos");

    } else if (document.getElementById("name").value != "" && document.getElementById("nick").value != "") {

        if (document.getElementById("colorSec").value === "#0000ff" || document.getElementById("colorSec").value === "#ffffff") {

            alert("¡Cambie el color!");

        } else {

            if (document.getElementById("foto").src === "") {

                alert("Tomate una foto por favor! No tengas miedo!");

            } else {
                if (Storage.get("p1") === null) {
                    let perfil1 = {

                        nombre: document.getElementById("name").value,
                        nick: document.getElementById("nick").value,
                        color: document.getElementById("colorSec").value,
                        foto: document.getElementById("foto").src,
                        points: 0

                    }
                    Storage.put("p1", perfil1);
                    document.getElementById("submit").innerHTML = "Confirmar Jugador 2";
                    document.getElementById("name").value = "";
                    document.getElementById("nick").value = "";
                    document.getElementById("foto").style.display = "none";
                    document.getElementById("foto2").style.display = "block";
                    document.getElementById("takefoto").setAttribute("onclick", "takePicture2()");
                } else if (Storage.get("p1") != null && Storage.get("p2") === null) {
                    if (document.getElementById("colorSec").value === Storage.get("p1").color) {

                        alert("¡Cambie el color!")

                    } else if (document.getElementById("foto2").src === "") {

                        alert("Tomate una foto por favor! No tengas miedo!");

                    } else {

                        let perfil2 = {

                            nombre: document.getElementById("name").value,
                            nick: document.getElementById("nick").value,
                            color: document.getElementById("colorSec").value,
                            foto: document.getElementById("foto2").src,
                            points: 0

                        }
                        Storage.put("p2", perfil2);
                        window.location.href = "juegos.html";
                    }
                }

            }



        }

    }

}

function checkProfile() {

    if (Storage.get("p1") != null && Storage.get("p2") != null) {

        window.location.href = "juegos.html";

    } else {

        Storage.kill();

    }

}

function checkProfile2() {

    if (Storage.get("p1") === null && Storage.get("p2") === null) {

        Storage.kill();
        window.location.href = "index.html";

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



function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

function onSuccess(imgData) {

    document.getElementById("foto").src = "data:image/jpeg;base64," + imgData;

}

function takePicture2() {

    let cameraOps = {

        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL

    }

    navigator.camera.getPicture(onSuccess2, onFail, cameraOps);

}


function onSuccess2(imgData) {

    document.getElementById("foto2").src = "data:image/jpeg;base64," + imgData;

}

function onFail(message) {
    alert('Failed because: ' + message);
}