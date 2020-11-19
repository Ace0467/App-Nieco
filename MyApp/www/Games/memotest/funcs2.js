let player1;
let player2;

let contenedorCont = document.getElementById("contenedor");


// let estadoDelJuego = {


//     asignadorToStart: (Math.floor(Math.random() * 2)),
//     movsPendientes: 3

// }


let asignadorToStart;

let imgSrc = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let arrForCheck = [];

function init() {

    asignadorToStart = Math.floor(Math.random() * 2);

    shuffle(imgSrc);

    if (asignadorToStart == 1) {

        document.getElementById("nombre1").style.color = "blue";
        document.getElementById("nombre2").style.color = "white";

    } else {

        document.getElementById("nombre1").style.color = "white";
        document.getElementById("nombre2").style.color = "blue";

    }

    for (i = 0; i < imgSrc.length; i++) {

        let casillero = document.createElement("div");
        casillero.setAttribute("id", "cell");
        casillero.setAttribute("data-cell-index", imgSrc[i])
        contenedorCont.appendChild(casillero);

        casillero.onclick = evt => {
            if (casillero.getAttribute("data-driver-index") === null || casillero.getAttribute("data-driver-index") === "" || casillero.getAttribute("class") != "correct" && arrForCheck.length < 2) {

                let casImg = document.createElement("img");
                casImg.setAttribute("src", "img/" + casillero.getAttribute("data-cell-index") + ".jpg")
                casImg.setAttribute("id", "selected");

                evt.target.appendChild(casImg);
                evt.target.setAttribute("data-driver-index", casillero.getAttribute("data-cell-index"));
                arrForCheck.push(evt.target.getAttribute("data-driver-index"));

            }

            if (arrForCheck.length == 2) {

                if (arrForCheck[0] === arrForCheck[1]) {

                    for (i = 0; i < contenedorCont.childNodes.length; i++) {

                        if (contenedorCont.childNodes[i].getAttribute("data-driver-index") === arrForCheck[0]) {

                            contenedorCont.childNodes[i]("data-driver-index") == null;
                            contenedorCont.childNodes[i]("class", "correct");
                            document.getElementById("selected").setAttribute("src", "img/correct.jpg");

                        }

                    }

                } else {

                    evt.target.removeChild(document.getElementById("selected"));

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
