function loadConfig() {

    document.getElementById("conf1").innerHTML = "Configuar el perfil de " + Storage.get("p1").nick;
    document.getElementById("conf2").innerHTML = "Configuar el perfil de " + Storage.get("p2").nick;

}