let contenedorCont = document.getElementById("contenedor");
var timer;
let points = 0;

var timer;

let asignadorToStart;
let contador = 0;
let contadorSel = 0;


let p = Storage.get(Storage.get("jugadorMemotest"));
let p1 = Storage.get("p1");
let p2 = Storage.get("p2");

let imgSrc = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let arrForCheck = ["", ""];
let jugador;

function init() {


    document.getElementById("nombre1").innerHTML = "Jugando como " +  Storage.get(Storage.get("jugadorMemotest")).nick;
    document.getElementById("nombre1").style.color = Storage.get(Storage.get("jugadorMemotest")).color;

    shuffle(imgSrc);

    for (i = 0; i < imgSrc.length; i++) {

        let casillero = document.createElement("div");
        casillero.setAttribute("id", "cell" + i);
        casillero.setAttribute("data-cell-index", imgSrc[i]);
        casillero.setAttribute("data-pos-index", i);
        contenedorCont.appendChild(casillero);

        casillero.onclick = evt => {
            if (arrForCheck.includes("")) {
                if (contador != 2) {

                    contador = contador + 1;

                } else {

                    contador = 1;

                }

                if (evt.target.getAttribute("data-driver-index") === null || evt.target.getAttribute("data-driver-index") === "" || evt.target.getAttribute("class") != "correct") {

                    evt.currentTarget.setAttribute("id", "selection" + contador);
                    evt.target.setAttribute("data-driver-index", casillero.getAttribute("data-cell-index"));
                    evt.target.style.backgroundImage = "url('img/" + casillero.getAttribute("data-cell-index") + ".png')";

                    if (arrForCheck.includes("")) {

                        if (arrForCheck[0] === "") {

                            arrForCheck[0] = evt.target.getAttribute("data-cell-index");

                        } else if (arrForCheck[0] != "" && arrForCheck[1] === "") {

                            arrForCheck[1] = evt.target.getAttribute("data-cell-index");

                            if (arrForCheck[0] === arrForCheck[1]) {

                                document.getElementById("selection1").style.backgroundImage = "url('img/correct.jpg')";
                                document.getElementById("selection1").setAttribute("id", "tachado" + document.getElementById("selection1").getAttribute("data-pos-index"));
                                document.getElementById("selection2").style.backgroundImage = "url('img/correct.jpg')";
                                document.getElementById("selection2").setAttribute("id", "tachado" + document.getElementById("selection2").getAttribute("data-pos-index"));


                                console.log("correcto");

                                points = points + 1;

                                if (points === 6) {

                                    document.getElementById("contenedor").style.display = "none";
                                    document.getElementById("nombres").style.display = "none";
                                    document.getElementById("winMsgInput").innerHTML = Storage.get(Storage.get("jugadorMemotest")).nick + " GANASTE!";
                                    document.getElementById("winMsgInput").style.color = Storage.get(Storage.get("jugadorMemotest")).color;
                                    document.getElementById("winMsg").style.display = "block";
                                    document.getElementById("contenedorAll").style.display = "flex";
                                    p.points = p.points + 6;
                                    Storage.put(Storage.get("jugadorMemotest"), p)
                                    timer = setTimeout(backHome, 5000);


                                }

                                arrForCheck = ["", ""];
                                console.log(arrForCheck);



                            } else {
                                console.log(arrForCheck);
                                timer = setTimeout(disappear, 750);

                            }

                        }

                    }


                }

            }
        }


    }

}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        let rep = array[i];
        array[i] = array[j];
        array[j] = rep;

    }

    return array;

}

function disappear() {

    document.getElementById("selection1").style.backgroundImage = "";
    document.getElementById("selection1").setAttribute("data-driver-index", "");
    document.getElementById("selection1").setAttribute("id", "");

    document.getElementById("selection2").style.backgroundImage = "";
    document.getElementById("selection2").setAttribute("data-driver-index", "");
    document.getElementById("selection2").setAttribute("id", "");


    console.log("incorrecto");

    arrForCheck = ["", ""];

}

function loadConfig() {

    document.getElementById("rem1").innerHTML = "Jugar como " + p1.nick;
    document.getElementById("rem1").style.color = p1.color;
    document.getElementById("rem2").innerHTML = "Jugar como " + p2.nick;
    document.getElementById("rem2").style.color = p2.color;

}

function choosePlayer(player) {

    window.location.href = "index.html";
    Storage.put("jugadorMemotest", player);

}

function backHome() {

    window.location.href = "rematch.html";

}