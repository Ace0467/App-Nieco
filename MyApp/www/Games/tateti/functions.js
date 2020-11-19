var timer;
let player1;
let player2;
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
    document.getElementById("p1TTT").innerHTML = Storage.get("nick1") + " es cruz";
    document.getElementById("p2TTT").innerHTML = Storage.get("nick2") + " es circulo";
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
            document.getElementById("p2TTT").style.color = Storage.get("color1");
        } else {
            document.getElementById("p1TTT").style.color = Storage.get("color2");
            document.getElementById("p2TTT").style.color = "blue";
        }
        casillero.onclick = evt => {
            if (casillero.getAttribute("data-player-index") == null) {
                let imgSeleccion = document.createElement("img");
                if (asignadorToStart == 1) {
                    casillero.setAttribute("data-player-index", 1);
                    imgSeleccion.setAttribute("src", "img/cruz.png");
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
                            document.getElementById("winMsgInput").innerHTML = Storage.get("nick1") + " GANASTE!";
                            document.getElementById("winMsg").style.display = "block";
                            Storage.put("points1", (Storage.get("points1") + 3));
                            timer = setTimeout(backHome, 5000);
                            break;
                        }
                    }
                    asignadorToStart = 0;
                    document.getElementById("p1TTT").style.color = Storage.get("color1");
                    document.getElementById("p2TTT").style.color = "blue";
                } else if(asignadorToStart != 1) {
                    casillero.setAttribute("data-player-index", 0);
                    imgSeleccion.setAttribute("src", "img/circulo.png");
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
                            document.getElementById("winMsgInput").innerHTML = Storage.get("nick2") + " GANASTE!";
                            document.getElementById("winMsg").style.display = "block";
                            Storage.put("points2", (Storage.get("points2") + 3));
                            timer = setTimeout(backHome, 5000);
                            break;
                        }
                    } 
                    


                    asignadorToStart = 1;
                    document.getElementById("p1TTT").style.color = "blue";
                    document.getElementById("p2TTT").style.color = Storage.get("color2");


                } else if(!ocupaciones.includes("")) {
                         
                    document.getElementById("contenedor").style.display = "none";
                    document.getElementById("nombres").style.display = "none";
                    document.getElementById("winMsgInput").innerHTML = "EMPATE";
                    document.getElementById("winMsg").style.display = "block";
                    Storage.put("points1", (Storage.get("points1") + 1));
                    Storage.put("points2", (Storage.get("points2") + 1));
                    timer = setTimeout(backHome, 5000);
            }
                evt.target.appendChild(imgSeleccion);


                
            };
        };
    }
}


function backHome() {

    window.location.href = "../../juegos.html";

}