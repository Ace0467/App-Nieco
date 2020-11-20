var timer;
let p1 = Storage.get("p1");
let p2 = Storage.get("p2");
let asignadorToStart;
let currentIndex;
let ocupaciones = ["", "", "", "", "", "", "", "", ""];
let combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let fondos = ["#17162D", "White", "Black", "Red", "Blue", "Yellow", 'url("img/boke.jpg")'];


function init() {
    asignadorToStart = (Math.floor(Math.random() * 2) + 1);
    document.getElementById("p1TTT").innerHTML = Storage.get("p1").nick + " es cruz";
    document.getElementById("p2TTT").innerHTML = Storage.get("p2").nick + " es circulo";
    let contenedorCont = document.getElementById("contenedor");
    let selBacks = document.getElementById("backgrounds");
    fondos.forEach(opcionescant => {
        let option = document.createElement("option");
        option.innerHTML = opcionescant;
        selBacks.appendChild(option);
    });
    selBacks.onchange = evt => {
        document.body.style.background = evt.target.value;
    }
    for (i = 0; i < 9; i++) {
        let casillero = document.createElement("div");
        casillero.setAttribute("id", "cell");
        casillero.setAttribute("data-cell-index", i)
        contenedorCont.appendChild(casillero);
        if (asignadorToStart == 1) {
            document.getElementById("p1TTT").style.color = "blue";
            document.getElementById("p2TTT").style.color = p2.color;
        } else {
            document.getElementById("p1TTT").style.color = p1.color;
            document.getElementById("p2TTT").style.color = "blue";
        }
        casillero.onclick = evt => {
            if (casillero.getAttribute("data-player-index") == null) {
                if (asignadorToStart == 1) {
                    casillero.setAttribute("data-player-index", 1);
                    casillero.style.backgroundImage = "url('img/cruz.png')";
                    ocupaciones[evt.target.getAttribute("data-cell-index")] = 1;
                    for (let i = 0; i <= 7; i++) {
                        let combinacionesForWin = combinaciones[i];
                        let a = ocupaciones[combinacionesForWin[0]];
                        let b = ocupaciones[combinacionesForWin[1]];
                        let c = ocupaciones[combinacionesForWin[2]];
                        if (a == "" || b == "" || c == "") {
                            continue;
                        }
                        if (a === b && b === c) {
                            document.getElementById("contenedor").style.display = "none";
                            document.getElementById("nombres").style.display = "none";
                            document.getElementById("winMsgInput").innerHTML = p1.nick + " GANASTE!";
                            document.getElementById("winMsgInput").style.color = p1.color;
                            document.getElementById("winMsg").style.display = "block";
                            p1.points += 3;
                            Storage.put("p1", p1);
                            timer = setTimeout(backHome, 5000);
                            break;
                        }
                    }
                    asignadorToStart = 0;
                    document.getElementById("p1TTT").style.color = p1.color;
                    document.getElementById("p2TTT").style.color = "blue";
                } else if(asignadorToStart != 1) {
                    casillero.setAttribute("data-player-index", 0);
                    casillero.style.backgroundImage = "url('img/circulo.png')";
                    ocupaciones[evt.target.getAttribute("data-cell-index")] = 0;
                    for (let i = 0; i <= 7; i++) {
                        let combinacionesForWin = combinaciones[i];
                        let a = ocupaciones[combinacionesForWin[0]];
                        let b = ocupaciones[combinacionesForWin[1]];
                        let c = ocupaciones[combinacionesForWin[2]];
                        if (a === '' || b === '' || c === '') {
                            continue;
                        }
                        if (a === b && b === c) {
                            document.getElementById("contenedor").style.display = "none";
                            document.getElementById("nombres").style.display = "none";
                            document.getElementById("winMsgInput").innerHTML = p2.nick + " GANASTE!";
                            document.getElementById("winMsgInput").style.color = p2.color;
                            document.getElementById("winMsg").style.display = "block";
                            p2.points =+ 3;
                            Storage.put("p2", p2);
                            timer = setTimeout(backHome, 5000);
                            break;
                        }
                    } 
                    


                    asignadorToStart = 1;
                    document.getElementById("p1TTT").style.color = "blue";
                    document.getElementById("p2TTT").style.color = p2.color;


                } else if(!ocupaciones.includes("")) {
                         
                    document.getElementById("contenedor").style.display = "none";
                    document.getElementById("nombres").style.display = "none";
                    document.getElementById("winMsgInput").innerHTML = "EMPATE";
                    document.getElementById("winMsg").style.display = "block";
                    p1.points =+ 3;
                    Storage.put("p1", p1);
                    p2.points =+ 3;
                    Storage.put("p2", p2);
                    timer = setTimeout(backHome, 5000);
            }


                
            };
        };
    }
}


function backHome() {

    window.location.href = "rematch.html";

}