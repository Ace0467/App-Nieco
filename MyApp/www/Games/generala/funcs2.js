let jugadas;

var timer;

let contenedorCont = document.getElementById("contenedorDados");

let estadoDelJuego = {

    dados: ["", "", "", "", ""],
    dadosAcambiar: [],
    pointsOne: 0,
    rounds: 0,
    points: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    asignadorToStart: Math.floor(Math.random() * 2) + 1

}

let arrDados;
let diceNum;
let botonRoll = document.getElementById("roll");
let botonReRoll = document.getElementById("reRoll");
let diceTemp;

let movsPendientes = 3;

// let combsLadder = [

//     [1, 2, 3, 4, 5]
//     [2, 3, 4, 5, 6]
//     [1, 3, 4, 5, 6]

// ];
function init() {
    // rondas = 0;

    document.getElementById("nombre1").innerHTML = Storage.get("nick1");
    document.getElementById("nombre2").innerHTML = Storage.get("nick2");

    if (estadoDelJuego.asignadorToStart == 1) {

        document.getElementById("nombre1").style.color = "blue";
        document.getElementById("nombre2").style.color = Storage.get("color2");

    } else {

        document.getElementById("nombre1").style.color = Storage.get("color1");
        document.getElementById("nombre2").style.color = "blue";

    }

    movsPendientes = 3;
    document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;
}

function diceRoll() {

    estadoDelJuego.dados = [];

    if (movsPendientes > 0) {

        if (movsPendientes == 3 || contenedorCont.innerHTML == null) {

            for (i = 0; i < 5; i++) {

                generateDice();

            }

        } else {

            if (contenedorCont.innerHTML != null) {

                for (i = 0; i < 5; i++) {

                    diceTemp = contenedorCont.childNodes[i];

                    if (diceTemp.getAttribute("class") != "selected") {

                        estadoDelJuego.dadosAcambiar.push(diceTemp);

                    }
                }
            }

            estadoDelJuego.dadosAcambiar.forEach(dice => {

                contenedorCont.removeChild(dice);

                generateDice();

            });

            estadoDelJuego.dadosAcambiar = [];

        }

        for (i = 0; i < 5; i++) {
            estadoDelJuego.dados.push(contenedorCont.childNodes[i].getAttribute("data-dice-index"));
        }


    }

    movsPendientes = movsPendientes - 1;

    if (movsPendientes > 0) {

    } else if (movsPendientes === 0) {

        botonRoll.style.display = "none";
        botonReRoll.style.display = "none";


    } else if (movsPendientes < 0) {

        movsPendientes = 3;

    }

    document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;

    checkPlays();
}

function disappearPlay() {

    document.getElementById("playOne").style.display = "none";
    document.getElementById("playTwo").style.display = "none";
    document.getElementById("playThree").style.display = "none";
    document.getElementById("playFour").style.display = "none";
    document.getElementById("playFive").style.display = "none";
    document.getElementById("playSix").style.display = "none";
    document.getElementById("playPoker").style.display = "none";
    document.getElementById("playFull").style.display = "none";
    document.getElementById("playEscalera").style.display = "none";
    document.getElementById("playGenerala").style.display = "none";
    document.getElementById("playGeneralaDoble").style.display = "none";


}

function checkPlays() {

    arrDados = estadoDelJuego.dados;
    arrDados.sort(function (a, b) { return a - b });


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_1").innerHTML === "") {

        document.getElementById("playOne").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playOne").style.display = "none";

    }


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_2").innerHTML === "") {

        document.getElementById("playTwo").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playTwo").style.display = "none";

    }


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_3").innerHTML === "") {

        document.getElementById("playThree").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playThree").style.display = "none";

    }


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_4").innerHTML === "") {

        document.getElementById("playFour").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playFour").style.display = "none";

    }

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_5").innerHTML === "") {

        document.getElementById("playFive").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playFive").style.display = "none";

    }

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_6").innerHTML === "") {

        document.getElementById("playSix").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playSix").style.display = "none";

    }


    //POKER

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_poker").innerHTML === "") {


        document.getElementById("playPoker").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playPoker").style.display = "none";

    }

    //FULL

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_full").innerHTML === "") {

        document.getElementById("playFull").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("playFull").style.display = "none";

    }

    //ESCALERAS (TODAS LAS COMBINAIONES)

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML === "") {


        document.getElementById("playEscalera").style.display = "block";

    } else if (movsPendientes < 0) {


        document.getElementById("playEscalera").style.display = "none";

    }

    //GENERALA (SINGULAR Y DOBLE)

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML === "") {


        document.getElementById("playGenerala").style.display = "block";

    } else if (movsPendientes < 0) {


        document.getElementById("playGenerala").style.display = "none";

    }

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala2").innerHTML === "" && document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML != "") {

        document.getElementById("playGeneralaDoble").style.display = "block";

    } else if (movsPendientes < 0 || document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML === "") {

        document.getElementById("playGeneralaDoble").style.display = "none";

    }

}

function generateDice() {

    diceNum = Math.floor(Math.random() * 6) + 1;

    let dadoCasillero = document.createElement("div");
    dadoCasillero.setAttribute("data-state-index", i);
    dadoCasillero.setAttribute("data-dice-index", diceNum);
    contenedorCont.appendChild(dadoCasillero);

    let dado = document.createElement("img");
    dado.setAttribute("data-dice-index", diceNum);
    dado.setAttribute("src", "img/dado" + diceNum + ".jpg");
    dadoCasillero.appendChild(dado);

    botonRoll.style.display = "none";
    botonReRoll.style.display = "block";
    //botonPlant.style.display = "block";

    dadoCasillero.onclick = evt => {

        if (evt.currentTarget.getAttribute("class") == null || evt.currentTarget.getAttribute("class") == "") {

            evt.currentTarget.setAttribute("class", "selected");

        } else if (evt.currentTarget.getAttribute("class") == "selected") {

            evt.currentTarget.classList.remove("selected");

        }
    }
}

function playGen() {

    if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {

        if (movsPendientes === 2) {
            if (estadoDelJuego.asignadorToStart === 1) {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("manos").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 1, GANASTE!";
                document.getElementById("winMsg").style.display = "block";
                document.getElementById("refresh").style.display = "block";
                Storage.put("points1", (Storage.get("points1") + 10));
                timer = setTimeout(backHome, 5000);

            } else {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("manos").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 2, GANASTE!";
                document.getElementById("winMsg").style.display = "block";
                document.getElementById("refresh").style.display = "block";
                Storage.put("points2", (Storage.get("points2") + 10));
                timer = setTimeout(backHome, 5000);

            }
        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][9] = 50;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][9];

        }
    } else {

        estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][9] = 0;
        document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][9];

    }

    finishTurn();

}

function playGenDoble() {

    if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != [] && document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML === 50) {

        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10] = 105;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala2").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10];


        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10] = 100;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala2").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10];

        }

    } else {

        estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10] = 0;
        document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala2").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10];

    }

    finishTurn();

}

function playPok() {

    if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] != arrDados[4] && !arrDados.includes("")) {

        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8] = 45;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_poker").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8];

        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8] = 40;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_poker").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8];

        }

    } else if (arrDados[0] != arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("")) {

        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8] = 45;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_poker").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8];

        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8] = 40;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_poker").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8];

        }


    } else {

        estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][8] = 0;
        document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_poker").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][9];

    }

    finishTurn();

}

function playLadder() {

    if (arrDados.includes("1") && arrDados.includes("2") && arrDados.includes("3") && arrDados.includes("4") && arrDados.includes("5") && !arrDados.includes("") && arrDados != []) {

        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6] = 25;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6];


        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6] = 20;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6];


        }
    } else if (arrDados.includes("2") && arrDados.includes("3") && arrDados.includes("4") && arrDados.includes("5") && arrDados.includes("6") && !arrDados.includes("") && arrDados != []) {

        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6] = 25;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6];


        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6] = 20;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6];


        }

    } else if (arrDados.includes("1") && arrDados.includes("3") && arrDados.includes("4") && arrDados.includes("5") && arrDados.includes("6") && !arrDados.includes("") && arrDados != []) {

        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6] = 25;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6];


        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6] = 20;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6];


        }

    } else {

        estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6] = 0;
        document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][6];


    }

    finishTurn();

}

function playFull() {

    if (arrDados[0] === arrDados[1] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {
        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7] = 35;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_full").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7];


        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7] = 30;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_full").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7];


        }
    } else if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {

        if (movsPendientes === 2) {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7] = 35;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_full").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7];


        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7] = 30;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_full").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7];

        }

    } else {

        estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7] = 0;
        document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_full").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][7];
    }

    finishTurn();

}

function playNumber(number) {

    for (i = 0; i < estadoDelJuego.dados.length; i++) {

        if (parseInt(estadoDelJuego.dados[i]) === number) {

            estadoDelJuego.pointsOne = estadoDelJuego.pointsOne + number;

        }

    }


    estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][number - 1] = estadoDelJuego.pointsOne;
    document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_" + number).innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][number - 1];



    finishTurn();

}

function finishTurn() {

    totalPoints();

    if (estadoDelJuego.rounds != 22) {

        if (estadoDelJuego.asignadorToStart === 1) {

            contenedorCont.innerHTML = ""

            document.getElementById("nombre1").style.color = Storage.get("color1");
            document.getElementById("nombre2").style.color = "blue";

            estadoDelJuego.asignadorToStart = 2;
            console.log("ahora va el otro 1");

        } else {

            contenedorCont.innerHTML = "";

            document.getElementById("nombre1").style.color = "blue";
            document.getElementById("nombre2").style.color = Storage.get("color2");

            estadoDelJuego.asignadorToStart = 1;
            console.log("ahora va el otro 2");
        }

        botonRoll.style.display = "block";
        botonReRoll.style.display = "none";

        movsPendientes = 3;
        document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;

    } else {

        if (document.getElementById("jugador1_puntos").innerHTML > document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedorDados").style.display = "none";
            document.getElementById("manos").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 1, GANASTE!";
            document.getElementById("refresh").style.display = "block";
            document.getElementById("winMsg").style.display = "block";
            Storage.put("points1", (Storage.get("points1") + 5));
            timer = setTimeout(backHome, 5000);


        } else if (document.getElementById("jugador1_puntos").innerHTML < document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedorDados").style.display = "none";
            document.getElementById("manos").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 2, GANASTE!";
            document.getElementById("refresh").style.display = "block";
            document.getElementById("winMsg").style.display = "block";
            Storage.put("points2", (Storage.get("points2") + 5));
            timer = setTimeout(backHome, 5000);


        } else if (document.getElementById("jugador1_puntos").innerHTML === document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedor").style.display = "none";
            document.getElementById("manos").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "EMPATE";
            document.getElementById("refresh").style.display = "block";
            document.getElementById("winMsg").style.display = "block";
            Storage.put("points1", (Storage.get("points1") + 1));
            Storage.put("points2", (Storage.get("points2") + 1)); 
            timer = setTimeout(backHome, 5000);


        }

    }

    estadoDelJuego.pointsOne = 0;
    estadoDelJuego.rounds = estadoDelJuego.rounds + 1;
    disappearPlay();
}

function totalPoints() {

    let total = 0;
    for (i = 0; i < estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1].length; i++) {

        total = total + estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][i];

    }
    document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_puntos").innerHTML = total;
}

function backHome() {

    window.location.href = "../../juegos.html";

}