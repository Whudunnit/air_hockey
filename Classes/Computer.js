class Computer {
    constructor(){
        this.x = w/2;
        this.y = h/10;
        this.dx = 3;
        this.dy = 3;
        this.defaultPosition = { x: this.x, y: this.y };
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, w*0.05, 0, 2*Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.stroke();
    }

    update(){
        if (Math.sign(puck.dy) === 1) {
            this.return();
        } else if (puck.y < this.y){
            this.return();
        } else if (Math.sign(puck.dy) === -1 && puck.y < h/2){
            this.strike();
        }
        const distance = Math.sqrt(Math.pow((puck.x - this.x), 2) + Math.pow((puck.y - this.y), 2));
        if (distance < 50 || (Math.sign(puck.dy) === -1 && puck.y < h/2)) {
            this.strike();
        } else {
            this.return();
        }

    }

    strike(){
        const dx = puck.x - this.x;
        const dy = puck.y - this.y;
        const angle = Math.atan2(dy, dx);

        const speed = 3;

        this.x += Math.cos(angle) * speed;
        this.y += Math.sin(angle) * speed;
    }

    return(){
        this.dx = 3;
        this.dy = 3;
        this.x += this.x > this.defaultPosition.x ? this.dx*-1 : this.dx;
        this.y += this.y > this.defaultPosition.y ? this.dy*-1 : this.dy;
    }
}
