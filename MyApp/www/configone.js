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