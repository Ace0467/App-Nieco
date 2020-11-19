let player1;// = prompt("Jugador 1, ingrese su nombre");
let player1points = 0;

let player2; //= prompt("Jugador 2, ingrese su nombre");
let player2points = 0;

let asignadorToStart;

var timer;
var timer2;



let colorSrc = ["green", "red", "yellow", "blue"];

let randomColor;

let movimientos = 1;
let movsPlayer = 0;
let x = 0;
let y = 0;
let arrMovs = [];
let arrMovsPlayer = [];
let rondas = 1;
let roundsPlayer = 0;
let limit = 20;

function init() {
    console.log("se inicio init");

    asignadorToStart = (Math.floor(Math.random() * 2) + 1);

    if (asignadorToStart === 1) {

        document.getElementById("nombre1").style.color = "blue";
        document.getElementById("nombre2").style.color = "white";

    } else {

        document.getElementById("nombre1").style.color = "white";
        document.getElementById("nombre2").style.color = "blue";

    }

    experimento(true);

}

function experimento(boolean) {

    x = 0;

    if (!boolean) {

        roundsPlayer = 0;

        y = 0;

        movimientos = 1;

        arrMovsPlayer = [];

        arrMovs = [];

    }

    if (rondas === limit + 1) {

        if (player1points > player2points) {

            document.getElementById("contenedor").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 1, GANASTE!";
            document.getElementById("winMsg").style.display = "block";

        } else if (player1points < player2points) {

            document.getElementById("contenedor").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 2, GANASTE!";
            document.getElementById("winMsg").style.display = "block";

        } else if (player1points === player2points) {

            document.getElementById("contenedor").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "EMPATE";
            document.getElementById("winMsg").style.display = "block";

        }

    } else {

        if (asignadorToStart === 1) {

            document.getElementById("nombre1").style.color = "blue";
            document.getElementById("nombre2").style.color = "white";

        } else {

            document.getElementById("nombre1").style.color = "white";
            document.getElementById("nombre2").style.color = "blue";

        }

    }

    randomColor = Math.floor(Math.random() * 4);

    arrMovs.push(randomColor);

    timer = setInterval(nextStep, 1000)

    document.getElementById("green").setAttribute("onclick", "");
    document.getElementById("red").setAttribute("onclick", "");
    document.getElementById("yellow").setAttribute("onclick", "");
    document.getElementById("blue").setAttribute("onclick", "");

}

function colorAppear(number) {

    console.log("se inicio colorA");

    document.getElementById(colorSrc[number] + "Img").style.display = "block";

}

function colorDisappear(ID) {

    console.log("se inicio colorD");

    document.getElementById(colorSrc[ID] + "Img").style.display = "none";

}


function clickOnColor(number) {

    arrMovsPlayer.push(number)

    if (arrMovsPlayer[arrMovsPlayer.length - 1] === arrMovs[arrMovsPlayer.length - 1]) {

        y = y + 1;

        if (arrMovsPlayer.length === arrMovs.length) {

            if (asignadorToStart === 1) {

                player1points = player1points + arrMovs.length;

                document.getElementById("nombre1").innerHTML = "Jugador 1: " + player1points;

            } else {

                player2points = player2points + arrMovs.length;

                document.getElementById("nombre2").innerHTML = "Jugador 2: " + player2points;

            }

            arrMovsPlayer = [];

            roundsPlayer = roundsPlayer + 1;

            if (roundsPlayer === 11) {

                document.getElementById("contenedor").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡JUGADOR " + asignadorToStart + ", GANASTE!";
                document.getElementById("winMsg").style.display = "block";

            }

            rondas = rondas + 1;

            document.getElementById("rounds").innerHTML = "Ronda " + rondas + "/20";

            experimento(true);

        }

    } else if (arrMovsPlayer[arrMovsPlayer.length - 1] != arrMovs[arrMovsPlayer.length - 1]) {

        if (asignadorToStart === 1) {

            asignadorToStart = 2;

        } else {

            asignadorToStart = 1;

        }

        roundsPlayer = 0;

        rondas = rondas + 1;

        document.getElementById("rounds").innerHTML = "Ronda " + rondas + "/20";

        experimento(false);

    } else if (y === movimientos) {

        y = 0;

        movimientos = movimientos + 1;

        experimento();

    }

}

function nextStep() {

    colorAppear(arrMovs[x]);

    timer2 = setTimeout(() => colorDisappear(arrMovs[x - 1]), 500);

    x++;

    if (x === arrMovs.length) {

        clearInterval(timer);

        document.getElementById("green").setAttribute("onclick", "clickOnColor(0)");
        document.getElementById("red").setAttribute("onclick", "clickOnColor(1)");
        document.getElementById("yellow").setAttribute("onclick", "clickOnColor(2)");
        document.getElementById("blue").setAttribute("onclick", "clickOnColor(3)");


    }

}