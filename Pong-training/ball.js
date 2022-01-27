class Ball {
    constructor(){
        this.size = 20;
        this.x = random(width/2 -100, width/2  +100 - this.size);
        this.y = random(height/2 -100, height/2  +100 - this.size);
        this.vel = 5;

        this.xStartVel = round(random());
        this.yStartVel = round(random());

        if (this.xStartVel){
            this.xV = this.vel * (-1);
        } else { 
            this.xV = this.vel 
        }

        if (this.yStartVel){
            this.yV = this.vel * (-1);
        } else { 
            this.yV = this.vel 
        }
    }
    show() {
        fill(255);
        rect(this.x, this.y, this.size, this.size);
    }
    update() {
        // walls - top and bottom
        if (this.y > height - this.size || this.y < 0){
            this.yV *= -1;
        }

        // add speed
        if (Math.abs(this.xV) < 5){ // will work earlier with 8
            this.xV *= 1.0004;
            this.yV *= 1.0004;
        }

        this.x += this.xV;
        this.y += this.yV;
    }
}