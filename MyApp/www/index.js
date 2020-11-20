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