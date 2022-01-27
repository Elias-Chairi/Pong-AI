const TOTAL = 100;
let balls = [];
// Current
let rekkerter = [];
// Save any that fail
let savedRekkerter = [];

function setup(){
    createCanvas(800, 400);
    // frameRate(60);

    // Improves performance for small neural networks and classifySync()
    ml5.tf.setBackend("cpu");

    //unneccecary ball
    //balls.push(new Ball());

    // left gard
    rekkerter.push(new Rekkert());
    rekkerter[0].y = 0;
    rekkerter[0].x = 40;
    rekkerter[0].height = height;

    // rekkerter.push(new Rekkert());

    // Create initial population
    for (let i = 1; i < TOTAL; i ++) {
        rekkerter[i] = new Rekkert();
        balls[i] = new Ball();
    }
}

function draw(){
    background(0);
    // spawn box
    fill('rgba(255,255,255, 0.2)');
    rect(width/2 -100, height/2 -100, 200, 200);
    
    
    for (let i = 1; i < balls.length; i++){
        balls[i].update();
        balls[i].show();

        // for hver ball så sjekker den om ballen har truffet en av rekkertene
        // check left gard and bounce
        if (collideRectRect(balls[i].x, balls[i].y, balls[i].size, balls[i].size, 
            rekkerter[0].x, rekkerter[0].y, rekkerter[0].width, rekkerter[0].height)
            // && rekkerter[0].wait == false
            ){
                balls[i].xV *= -1;
                // rekkerter[0].wait = true;
                // setTimeout(() => {rekkerter[0].wait = false}, 250);
        }
        // check the ball that belongs to a rekkert;
        if (collideRectRect(balls[i].x, balls[i].y, balls[i].size, balls[i].size, 
            rekkerter[i].x, rekkerter[i].y, rekkerter[i].width, rekkerter[i].height)
            && rekkerter[i].wait == false){
                balls[i].xV *= -1;
                rekkerter[i].wait = true;
                rekkerter[i].score += 1000; // give score when ball hits rekkert
                setTimeout(() => { if (rekkerter[i]){ rekkerter[i].wait = false } }, 250);
        }

        for (const rekkert of savedRekkerter) {
            rekkert.score --; // take away score over time when dead
        }

        // utafor skjermn?
        if (balls[i].x > width + 100 || balls[i].x < -100){
            savedRekkerter.push(rekkerter.splice(i, 1)[0]);
            if (balls.length == 2){
                console.log(" "); // space in the log
                console.log("last standing ball velocity: " + balls[i].xV);
            }
            balls.splice(i, 1);
        }
    }


    rekkerter[0].show();

    for (let i = 1; i < rekkerter.length; i++){
        if (balls.length > 1){
            rekkerter[i].think(balls[i]);
            rekkerter[i].update();
            rekkerter[i].show();
        }
    }

    if (rekkerter.length === 1) {
        nextGeneration();
    }
}


// ferdig funksjon fra https://github.com/bmoren/p5.collide2D
function collideRectRect(x, y, w, h, x2, y2, w2, h2) {
    if (x + w >= x2 &&    // r1 right edge past r2 left
        x <= x2 + w2 &&    // r1 left edge past r2 right
        y + h >= y2 &&    // r1 top edge past r2 bottom
        y <= y2 + h2) {    // r1 bottom edge past r2 top
            return true;
    }
    return false;
};