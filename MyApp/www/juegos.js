function loadGames() {

    document.getElementById("jug1").innerHTML = Storage.get("p1").nick + "<br>" + Storage.get("p1").points + " puntos";
    document.getElementById("jug1").style.color = Storage.get("p1").color;
    document.getElementById("jug1img").src = Storage.get("p1").foto
    document.getElementById("jug2").innerHTML = Storage.get("p2").nick + "<br>" + Storage.get("p2").points + " puntos";
    document.getElementById("jug2").style.color = Storage.get("p2").color;
    document.getElementById("jug2img").src = Storage.get("p1").foto

}

function loadConfig() {

    document.getElementById("conf1").innerHTML = "Modificar perfil 1: " + Storage.get("p1").nick;
    document.getElementById("conf2").innerHTML = "Modificar perfil 2: " + Storage.get("p2").nick;

}