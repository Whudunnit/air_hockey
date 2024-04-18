class Computer {
    constructor(){
        this.x = w/2;
        this.y = h/10;
        this.dy = 3;
        this.dy = 3;
        this.defaultPosition = { x: this.x, y: this.y };
        this.rectangle = { minX: 0, maxX: 500, minY: 350, maxY: 700 };
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, w*0.05, 0, 2*Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.stroke();
    }

    update(){
        if(Math.sign(puck.dy) === 1) {
            this.return();
        }else if (puck.y < this.y){
            this.return();
        }else if (Math.sign(puck.dy) === -1 && puck.y < h/2){
            this.strike();
        }
    }

    strike(){
        const dx = puck.x - this.x;
        const dy = puck.y - this.y;
        const angle = Math.atan(dy, dx);


        const speed = 15;

        this.x += Math.cos(angle) * speed;
        this.y += Math.sin(angle) * speed;
    }

    return(){
        this.dx = 3;
        this.dy = 3;
        this.x += this.x > this.defaultPosition.x ? this.dx*-1 :this.dx
        this.y += this.y > this.defaultPosition.y ? this.dy*-1 :this.dy
    }
}