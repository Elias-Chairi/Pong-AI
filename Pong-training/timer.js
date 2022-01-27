const timer = window.setInterval(timerFunc, 100);

let minutt = 0;
let sekund = 0;
let tiendedelsSekund = 0;
const h3timer = document.getElementById("timer");

function timerFunc() {
    if (balls.length == 0){ 
        window.clearInterval(timer);
    }

    tiendedelsSekund ++;
    if (tiendedelsSekund == 10){
        tiendedelsSekund = 0;
        sekund++;
    }
    if (sekund == 60){
        sekund = 0;
        minutt++;
    }
    h3timer.innerHTML = `Timer: ${minutt} : ${sekund} : ${tiendedelsSekund}`;
}