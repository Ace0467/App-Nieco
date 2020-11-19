
function confirmarPlayerOne() {

    if (document.getElementById("name").value === "" || document.getElementById("nick").value === "") {

        alert("Datos incompletos");

    } else if (document.getElementById("name").value != "" && document.getElementById("nick").value != "") {

        Storage.put("nombre1", document.getElementById("name").value);
        Storage.put("nick1", document.getElementById("nick").value);
        Storage.put("color1", document.getElementById("colorSec").value);
        Storage.put("points1", 0);
        window.location.href = "playertwo.html";

    }

}

function confirmarPlayerTwo() {

    if (document.getElementById("name2").value === "" || document.getElementById("nick2").value === "") {

        alert("Datos incompletos");

    } else if (document.getElementById("name2").value != "" && document.getElementById("nick2").value != "") {

        if (document.getElementById("colorSec2").value === Storage.get("color1")) {

            alert("¡Cambie el color!");

        } else {

            Storage.put("nombre2", document.getElementById("name2").value);
            Storage.put("nick2", document.getElementById("nick2").value);
            Storage.put("color2", document.getElementById("colorSec2").value);
            Storage.put("points2", 0);
            window.location.href = "juegos.html";

        }

    }

}

function loadGames() {

    document.getElementById("jug1").innerHTML = Storage.get("nick1") + " " + Storage.get("points1") + " puntos";
    document.getElementById("jug1").style.color = Storage.get("color1");
    document.getElementById("jug2").innerHTML = Storage.get("nick2") + " " + Storage.get("points2") + " puntos";
    document.getElementById("jug2").style.color = Storage.get("color2");

}

function loadConfig() {

    document.getElementById("conf1").innerHTML = "Modificar perfil 1: " + Storage.get("nick1");
    document.getElementById("conf2").innerHTML = "Modificar perfil 2: " + Storage.get("nick2");

}

function checkProfile() {

    if (Storage.get("nombre1") != null && Storage.get("nick1") != null) {

        window.location.href = "juegos.html";
    }
}

function p1Values() {

    document.getElementById("name1config").value = Storage.get("nombre1");
    document.getElementById("nick1config").value = Storage.get("nick1");
    document.getElementById("colorSec1config").value = Storage.get("color1");


}

function confirmP1Values() {

    if (document.getElementById("colorSec1config").value === Storage.get("color1")) {

        alert("¡Cambie el color!");

    } else {

        Storage.put("nombre1", document.getElementById("name1config").value);
        Storage.put("nick1", document.getElementById("nick1config").value);
        Storage.put("color1", document.getElementById("colorSec1config").value);
        window.location.href = "juegos.html";

    }

}

function p2Values() {

    document.getElementById("name2config").value = Storage.get("nombre2");
    document.getElementById("nick2config").value = Storage.get("nick2");
    document.getElementById("colorSec2config").value = Storage.get("color2");

}

function confirmP2Values() {

    if (document.getElementById("colorSec2config").value === Storage.get("color1")) {

        alert("¡Cambie el color!");

    } else {

        Storage.put("nombre2", document.getElementById("name2config").value);
        Storage.put("nick2", document.getElementById("nick2config").value);
        Storage.put("color2", document.getElementById("colorSec2config").value);
        window.location.href = "juegos.html";

    }

}

function killStorage() {

    Storage.kill();
    window.location.href = "index.html";

}

function takePicture() {

    let cameraOptions = {

        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL

    };

    navigator.camera.getPicture(onSuccess, onFail, cameraOptions)

}

function onSuccess(imgData) {

document.getElementById("foto").src = "data:image/jpeg;base64," + imgData;

}

function onFail() {

    alert("No se pudo tomar la foto");

}