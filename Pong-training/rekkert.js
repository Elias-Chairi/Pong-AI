class Rekkert {
    constructor(brain){
        this.width = 10;
        this.height = 70;
        this.x = width - 50;
        this.y = height/2 - this.height/2;
        this.vel = 5;
        this.wait = false;

        this.score = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain;
        } else {
            // Create a new neural network
            const options = {
                inputs: 5,
                outputs: ["up", "down", "rest"],
                task: "classification",
                noTraining: true
            };
            this.brain = ml5.neuralNetwork(options);
        }
    }
    show() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
    update() {
        // if (keyIsDown(UP_ARROW)) {
        //     this.y -= this.vel;
        // }
        // if (keyIsDown(DOWN_ARROW)){
        //     this.y += this.vel;
        // }

        this.y = constrain(this.y, 0, height - this.height);
        // this.score ++; // add score over time when alive
    }
    think(ball) {
        // Normalize 5 inputs
        const inputs = [];
        inputs[0] = map(this.y, 0, height - this.height, 0, 1); // Y pos
        inputs[1] = map(ball.x, -200, width + 200, 0, 1); // ball X pos
        inputs[2] = map(ball.y, 0, height - ball.size, 0, 1); // ball Y pos
        inputs[3] = map(ball.xV, 0, 15, 0, 1); // ball X velocity
        inputs[4] = map(ball.yV, 0, 15, 0, 1); // ball Y velocity
    
        // Jump according to neural network output
        const results = this.brain.classifySync(inputs);
        if (results[0].label === "up") {
            this.y -= this.vel;
        } else if (results[0].label === "down"){
            this.y += this.vel;
        } else {
            // if (genCounter > 10){
            //     this.score += 10; // to try make it predict and favor less moves
            // }
        }
    }
}