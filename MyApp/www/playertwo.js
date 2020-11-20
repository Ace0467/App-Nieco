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