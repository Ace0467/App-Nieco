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