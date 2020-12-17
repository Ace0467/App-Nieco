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

let p1 = Storage.get("p1");
let p2 = Storage.get("p2");

// let combsLadder = [

//     [1, 2, 3, 4, 5]
//     [2, 3, 4, 5, 6]
//     [1, 3, 4, 5, 6]

// ];
function init() {
    // rondas = 0;

    document.getElementById("nombre1").innerHTML = p1.nick;
    document.getElementById("nombre2").innerHTML = p2.nick;

    if (estadoDelJuego.asignadorToStart == 1) {

        document.getElementById("nombre1").style.color = "blue";
        document.getElementById("nombre2").style.color = p2.color;

    } else {

        document.getElementById("nombre1").style.color = p1.color;
        document.getElementById("nombre2").style.color = "blue";

    }

    movsPendientes = 3;
    document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;
    generateBlankDice();

}

function diceRoll() {

    estadoDelJuego.dados = [];

    if (movsPendientes > 0) {

        if (movsPendientes == 3) {

            contenedorCont.innerHTML = null;

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

    document.getElementById("playOne").setAttribute("onclick", "");
    document.getElementById("playTwo").setAttribute("onclick", "");
    document.getElementById("playThree").setAttribute("onclick", "");
    document.getElementById("playFour").setAttribute("onclick", "");
    document.getElementById("playFive").setAttribute("onclick", "");
    document.getElementById("playSix").setAttribute("onclick", "");
    document.getElementById("playPoker").setAttribute("onclick", "");
    document.getElementById("playFull").setAttribute("onclick", "");
    document.getElementById("playEscalera").setAttribute("onclick", "");
    document.getElementById("playGenerala").setAttribute("onclick", "");
    document.getElementById("playGeneralaDoble").setAttribute("onclick", "");

}

function checkPlays() {

    arrDados = estadoDelJuego.dados;
    arrDados.sort(function (a, b) { return a - b });


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_1").innerHTML === "") {

        document.getElementById("playOne").setAttribute("onclick", "playNumber(1)");

    } else if (movsPendientes < 0) {

        document.getElementById("playOne").setAttribute("onclick", "");

    }


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_2").innerHTML === "") {

        document.getElementById("playTwo").setAttribute("onclick", "playNumber(2)");

    } else if (movsPendientes < 0) {

        document.getElementById("playTwo").setAttribute("onclick", "");

    }


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_3").innerHTML === "") {

        document.getElementById("playThree").setAttribute("onclick", "playNumber(3)");

    } else if (movsPendientes < 0) {

        document.getElementById("playThree").setAttribute("onclick", "");

    }


    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_4").innerHTML === "") {

        document.getElementById("playFour").setAttribute("onclick", "playNumber(4)");

    } else if (movsPendientes < 0) {

        document.getElementById("playFour").setAttribute("onclick", "");

    }

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_5").innerHTML === "") {

        document.getElementById("playFive").setAttribute("onclick", "playNumber(5)");

    } else if (movsPendientes < 0) {

        document.getElementById("playFive").setAttribute("onclick", "");

    }

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_6").innerHTML === "") {

        document.getElementById("playSix").setAttribute("onclick", "playNumber(6)");

    } else if (movsPendientes < 0) {

        document.getElementById("playSix").setAttribute("onclick", "");

    }


    //POKER

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_poker").innerHTML === "") {


        document.getElementById("playPoker").setAttribute("onclick", "playPok()");

    } else if (movsPendientes < 0) {

        document.getElementById("playPoker").setAttribute("onclick", "");

    }

    //FULL

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_full").innerHTML === "") {

        document.getElementById("playFull").setAttribute("onclick", "playFull()");

    } else if (movsPendientes < 0) {

        document.getElementById("playFull").setAttribute("onclick", "");

    }

    //ESCALERAS (TODAS LAS COMBINAIONES)

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_escalera").innerHTML === "") {


        document.getElementById("playEscalera").setAttribute("onclick", "playLadder()");

    } else if (movsPendientes < 0) {


        document.getElementById("playEscalera").setAttribute("onclick", "");

    }

    //GENERALA (SINGULAR Y DOBLE)

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML === "") {


        document.getElementById("playGenerala").setAttribute("onclick", "playGen()");

    } else if (movsPendientes < 0) {


        document.getElementById("playGenerala").setAttribute("onclick", "");

    }

    if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala2").innerHTML === "" && document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML != "") {

        document.getElementById("playGeneralaDoble").setAttribute("onclick", "playGenDoble()");

    } else if (movsPendientes < 0 || document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML === "") {

        document.getElementById("playGeneralaDoble").setAttribute("onclick", "");

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

            evt.currentTarget.setAttribute("class", "");

        }
    }
}

function generateBlankDice() {

    contenedorCont.innerHTML = null;

    for (let i = 0; i < 5; i++) {
        let dadoCasillero = document.createElement("div");
        contenedorCont.appendChild(dadoCasillero);

        let dado = document.createElement("img");
        dado.setAttribute("src", "img/dado0.jpg");
        dadoCasillero.appendChild(dado);
    }


}

function playGen() {

    if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {

        if (movsPendientes === 2) {
            let puntosJug1 = document.getElementById("jugador1_puntos").innerHTML;
            Storage.put("p1pointsGen", puntosJug1)
            let puntosJug2 = document.getElementById("jugador2_puntos").innerHTML;
            Storage.put("p2pointsGen", puntosJug2)
            if (estadoDelJuego.asignadorToStart === 1) {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("manos").style.display = "none";
                document.getElementById("dadosYpuntaje").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡" + p1.nick + ", GANASTE!";
                document.getElementById("winMsgInput").style.color = p1.color;
                document.getElementById("winMsgInputP1").innerHTML = p1.nick + " " + Storage.get("p1pointsGen");
                document.getElementById("winMsgInputP1").style.color = p1.color;
                document.getElementById("winMsgInputP2").innerHTML = p2.nick + " " + Storage.get("p2pointsGen");
                document.getElementById("winMsgInputP2").style.color = p2.color;
                document.getElementById("winMsg").style.display = "block";
                document.getElementById("refresh").style.display = "block";
                p1.points += 10;
                Storage.put("p1", p1);
                timer = setTimeout(backHome, 7500);

            } else {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("manos").style.display = "none";
                document.getElementById("dadosYpuntaje").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡" + p2.nick + ", GANASTE!";
                document.getElementById("winMsgInput").style.color = p2.color;
                document.getElementById("winMsgInputP1").innerHTML = p1.nick + " " + Storage.get("p1pointsGen");
                document.getElementById("winMsgInputP1").style.color = p1.color;
                document.getElementById("winMsgInputP2").innerHTML = p2.nick + " " + Storage.get("p2pointsGen");
                document.getElementById("winMsgInputP2").style.color = p2.color;
                document.getElementById("winMsg").style.display = "block";
                document.getElementById("refresh").style.display = "block";
                p2.points += 10;
                Storage.put("p2", p2);
                timer = setTimeout(backHome, 7500);

            }
        } else {

            estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][9] = 50;
            document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][9];

        }
    } else if (document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala2").innerHTML === "") {

        estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10] = 0;
        document.getElementById("jugador" + estadoDelJuego.asignadorToStart + "_generala2").innerHTML = estadoDelJuego.points[estadoDelJuego.asignadorToStart - 1][10];

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

    if (estadoDelJuego.rounds != 21) {

        if (estadoDelJuego.asignadorToStart === 1) {

            contenedorCont.innerHTML = ""

            document.getElementById("nombre1").style.color = p1.color;
            document.getElementById("nombre2").style.color = "blue";
            estadoDelJuego.asignadorToStart = 2;
        } else {

            contenedorCont.innerHTML = "";

            document.getElementById("nombre1").style.color = "blue";
            document.getElementById("nombre2").style.color = p2.color;

            estadoDelJuego.asignadorToStart = 1;
        }

        generateBlankDice();
        botonRoll.style.display = "block";
        botonReRoll.style.display = "none";

        movsPendientes = 3;
        document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;

    } else {

        let puntosJug1 = document.getElementById("jugador1_puntos").innerHTML;
        Storage.put("p1pointsGen", puntosJug1)
        let puntosJug2 = document.getElementById("jugador2_puntos").innerHTML;
        Storage.put("p2pointsGen", puntosJug2)

        if (document.getElementById("jugador1_puntos").innerHTML > document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedorDados").style.display = "none";
            document.getElementById("manos").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("manos").style.display = "none";
            document.getElementById("dadosYpuntaje").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡" + p1.nick + ", GANASTE!";
            document.getElementById("winMsgInput").style.color = p1.color;
            document.getElementById("winMsgInputP1").innerHTML = p1.nick + " " + Storage.get("p1pointsGen");
            document.getElementById("winMsgInputP1").style.color = p1.color;
            document.getElementById("winMsgInputP2").innerHTML = p2.nick + " " + Storage.get("p2pointsGen");
            document.getElementById("winMsgInputP2").style.color = p2.color;
            document.getElementById("winMsgInput").style.color = p1.color;
            document.getElementById("winMsg").style.display = "block";
            p1.points += 5;
            Storage.put("p1", p1);
            timer = setTimeout(backHome, 7500);


        } else if (document.getElementById("jugador1_puntos").innerHTML < document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedorDados").style.display = "none";
            document.getElementById("manos").style.display = "none";
            document.getElementById("nombres").style.display = "none"
            document.getElementById("dadosYpuntaje").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡" + p2.nick + ", GANASTE!";
            document.getElementById("winMsgInput").style.color = p2.color;
            document.getElementById("winMsgInputP1").innerHTML = p1.nick + " " + Storage.get("p1pointsGen");
            document.getElementById("winMsgInputP1").style.color = p1.color;
            document.getElementById("winMsgInputP2").innerHTML = p2.nick + " " + Storage.get("p2pointsGen");
            document.getElementById("winMsgInputP2").style.color = p2.color;
            document.getElementById("winMsgInput").style.color = p2.color;
            document.getElementById("winMsg").style.display = "block";
            p2.points += 5;
            Storage.put("p2", p2);
            timer = setTimeout(backHome, 7500);


        } else if (document.getElementById("jugador1_puntos").innerHTML === document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedorDados").style.display = "none";
            document.getElementById("manos").style.display = "none";
            document.getElementById("dadosYpuntaje").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "EMPATE";
            document.getElementById("winMsgInputP1").innerHTML = p1.nick + " " + Storage.get("p1pointsGen");
            document.getElementById("winMsgInputP2").innerHTML = p2.nick + " " + Storage.get("p2pointsGen");
            document.getElementById("winMsg").style.display = "block";
            p1.points += 10;
            Storage.put("p1", p1);
            p2.points += 10;
            Storage.put("p2", p2);
            timer = setTimeout(backHome, 7500);


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

    window.location.href = "rematch.html";

}