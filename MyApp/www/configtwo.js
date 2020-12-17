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
            points: Storage.get("p2").points,
            foto: document.getElementById("foto").src

        }

        Storage.put("p2", perfil2);
        window.location.href = "juegos.html";

    }

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
    // document.getElementById("foto").addEventListener("click", cameraTakePicture);
}

function onSuccess(imgData) {

    document.getElementById("foto").src = "data:image/jpeg;base64," + imgData;

}

function onFail(message) {
    alert('Failed because: ' + message);
}