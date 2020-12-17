

let p1 = Storage.get("p1");
let p2 = Storage.get("p2");
let player2points = 0;
let player1points = 0;

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

function cambiarColor(){

    document.getElementById("greenImg").style.display = "block";

}

function init() {

    document.getElementById("nombre1").innerHTML = p1.nick + ": " + player1points;
    document.getElementById("nombre1").style.color = p1.color;
    document.getElementById("nombre2").innerHTML = p2.nick + ": " + player2points;
    document.getElementById("nombre2").style.color = p2.color;

}

function init2() {
    document.getElementById("rounds").innerHTML = "Ronda " + rondas + "/20";
    document.getElementById("rounds").removeAttribute("onclick");
    document.getElementById("rounds").removeAttribute("class");

    asignadorToStart = (Math.floor(Math.random() * 2) + 1);

    if (asignadorToStart === 1) {

        document.getElementById("nombre1").style.color = "blue";
        document.getElementById("nombre2").style.color = p2.color;

    } else {

        document.getElementById("nombre1").style.color = p1.color;
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
            document.getElementById("winMsgInput").innerHTML = p1.nick + " , GANASTE!";
            document.getElementById("winMsg").style.display = "block";
            p1.points += 10;
            Storage.put("p1", p1);

        } else if (player1points < player2points) {

            document.getElementById("contenedor").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = p2.nick + " , GANASTE!";
            document.getElementById("winMsg").style.display = "block";
            p2.points += 10;
            Storage.put("p2", p2);

        } else if (player1points === player2points) {

            document.getElementById("contenedor").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "EMPATE";
            document.getElementById("winMsg").style.display = "block";
            p1.points += 15;
            Storage.put("p1", p1);
            p1.points += 15;
            Storage.put("p2", p2);

        }

    } else {

        if (asignadorToStart === 1) {

            document.getElementById("nombre1").style.color = "blue";
            document.getElementById("nombre2").style.color =  p2.color;

        } else {

            document.getElementById("nombre1").style.color = p1.color;
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


    document.getElementById(colorSrc[number] + "Img").style.display = "block";


    loadSong(number);

}

function loadSong(n) {
    track = new Audio("audio/" + colorSrc[n] + ".mp3");
    trackColor = track;
    trackColor.play();
}

function colorDisappear(ID) {


    document.getElementById(colorSrc[ID] + "Img").style.display = "none";

}


function clickOnColor(number) {

    arrMovsPlayer.push(number)
    loadSong(number);

    if (arrMovsPlayer[arrMovsPlayer.length - 1] === arrMovs[arrMovsPlayer.length - 1]) {

        y = y + 1;

        if (arrMovsPlayer.length === arrMovs.length) {

            if (asignadorToStart === 1) {

                player1points = player1points + arrMovs.length;

                document.getElementById("nombre1").innerHTML = p1.nick + ": " + player1points;

            } else {

                player2points = player2points + arrMovs.length;

                document.getElementById("nombre2").innerHTML = p2.nick + ": " + player2points;

            }

            arrMovsPlayer = [];

            roundsPlayer = roundsPlayer + 1;

            if (roundsPlayer === 3) {

                if (asignadorToStart === 1) {

                    document.getElementById("contenedor").style.display = "none";
                    document.getElementById("nombres").style.display = "none";
                    document.getElementById("winMsgInput").innerHTML = "¡" + p1.nick + ", GANASTE!";
                    document.getElementById("winMsgInput").style.color = p1.color;
                    document.getElementById("winMsg").style.display = "block";
                    p1.points += 20;
                    Storage.put("p1", p1);

                } else {

                    document.getElementById("contenedor").style.display = "none";
                    document.getElementById("nombres").style.display = "none";
                    document.getElementById("winMsgInput").innerHTML = "¡" + p2.nick + ", GANASTE!";
                    document.getElementById("winMsgInput").style.color = p2.color;
                    document.getElementById("winMsg").style.display = "block";
                    p2.points += 20;
                    Storage.put("p2", p2);

                }
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

