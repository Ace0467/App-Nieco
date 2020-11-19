// "" es vacio, 1 es jugadorcruz, 0 es jugadorcirculo
let valores_tablero = ["", "", "", "", "", "", "", "", ""];
let tablero = document.getElementById("contenedor");
let JugadorCruz;
let JugadorCirculo;
let quienempieza;
let combiancionesganadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function dibujarTablero() {
    quienempieza = (Math.floor(Math.random() * 2));
    console.log(quienempieza);
    for (i = 0; i < 9; i++) {
        //document.getElementById("contenido-tablero" + i).innerHTML = tablero[i];
        let casillero = document.createElement("div");
        casillero.setAttribute("id", "casillero");
        casillero.setAttribute("data-casillero-index", i);
        tablero.appendChild(casillero);
        casillero.onclick = evt => {
            console.log(quienempieza);
            if (casillero.getAttribute("data-jugador-index") == null) {
                let cruzocirculo = document.createElement("h3");
                //1 jugador cruz, 0 jugador circulo
                if (quienempieza == 1) {
                    casillero.setAttribute("data-jugador-index", 1);
                    cruzocirculo.innerHTML = "X";
                    casillero.appendChild(cruzocirculo);
                    valores_tablero[evt.target.getAttribute("data-casillero-index")] = 1;
                    
                    for (j = 0; j <= 7; j++) {
                        let combinacionesseleccionadas = combiancionesganadoras[j];
                        let a = valores_tablero[combinacionesseleccionadas[0]];
                        let b = valores_tablero[combinacionesseleccionadas[1]];
                        let c = valores_tablero[combinacionesseleccionadas[2]];
                        console.log(a, b, c);
                        if (a === "" || b === "" || c === "") {
                            continue;
                        }
                        if (a == b && b == c) {
                            document.getElementById("contenedor").style.display = "none";
                            document.getElementById("nombres").style.display = "none";
                            document.getElementById("winMsgInput").innerHTML = " GANASTE!";
                            document.getElementById("winMsg").style.display = "block";
                            break;
                        }
                    }
                    quienempieza = 0;
                    console.log("ahora empieza 0");
                } else {
                    casillero.setAttribute("data-jugador-index", 0);
                    cruzocirculo.innerHTML = "O";
                    casillero.appendChild(cruzocirculo);
                    valores_tablero[evt.target.getAttribute("data-casillero-index")] = 0;
                    
                    for (j = 0; j <= 7; j++) {
                        let combinacionesseleccionadas = combiancionesganadoras[j];
                        let a = valores_tablero[combinacionesseleccionadas[0]];
                        let b = valores_tablero[combinacionesseleccionadas[1]];
                        let c = valores_tablero[combinacionesseleccionadas[2]];
                        if (a === "" || b === "" || c === "") {
                            continue;
                        }
                        if (a === b && b === c) {
                            document.getElementById("contenedor").style.display = "none";
                            document.getElementById("nombres").style.display = "none";
                            document.getElementById("winMsgInput").innerHTML = " GANASTE!";
                            document.getElementById("winMsg").style.display = "block";
                            break;
                        }
                    }
                    quienempieza = 1;
                    console.log("ahora empieza 1");
                }
            }
            if(!valores_tablero.includes("")){
                console.log("empate");
            }
        }
    }
}