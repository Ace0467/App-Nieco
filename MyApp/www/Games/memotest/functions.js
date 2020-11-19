let contenedorCont = document.getElementById("contenedor");

let points = 0;

var timer;

let asignadorToStart;
let contador = 0;
let contadorSel = 0;




let imgSrc = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let arrForCheck = ["", ""];

function init() {

    asignadorToStart = Math.floor(Math.random() * 2);

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
                                    document.getElementById("winMsgInput").innerHTML = " GANASTE!";
                                    document.getElementById("winMsg").style.display = "block";

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