const canvas = document.createElement('canvas');
const w = canvas.width = 700;
const h = canvas.height = 900;
document.body.appendChild(canvas);
const context = canvas.getContext('2d');


const board = () => {

  
    context.beginPath();
    context.arc(w/2,h/2,w/10,0,2*Math.PI);
    context.moveTo(0,h/2);
    context.lineTo(w,h/2);
    context.stroke();
}

window.addEventListener('mousemove', (e) =>{
    player.x = e.x - window.innerWidth/2 + w/2;
    player.y = e.y - h*0.05;
})

class Player {
    constructor (){
        this.x = undefined;
        this.y = undefined;
        this.prevX = undefined;
        this.prevY = undefined;
        this.dx = undefined;
        this.dy = undefined;
    }

    draw (){
        context.beginPath();
        context.arc(this.x, this.y, w*0.05, 0, 2*Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.stroke();
    }

    update(){
        this.dx = this.x - this.prevX;
        this.dy = this.y - this.prevY;
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = Math.max(Math.min(this.x, w - w*0.05), w*0.05);
        this.y = Math.max(Math.min(this.y, h - w*0.05), w*0.05);
    }
}

class Puck {
    constructor(){
        this.x = w/2;
        this.y = h/2;
        this.dx = 5;
        this.dy = 5;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, w*0.04, 0, 2*Math.PI);
        context.fillStyle = "black";
        context.fill();
        context.stroke();
    }
    
    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.x = Math.max(Math.min(this.x, w - w*0.04), w*0.04);
        this.y = Math.max(Math.min(this.y, h - w*0.04), w*0.04);

        if(this.x + w*0.04 >= w || this.x - w*0.04 <= 0){
            this.dx *=-1;
        }

        if(this.y + w*0.04 >= h || this.y - w*0.04 <= 0){
            this.dy *=-1;
        }

        // Collision
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if(distance < w*0.04 + w*0.05){
            
            if (this.dx !== 0) {
                this.dx += player.dx * 0.5;
            } else {
                this.dx = player.dx * 0.5;
            }
            if (this.dy !== 0) {
                this.dy += player.dy * 0.5;
            } else {
                this.dy = player.dy * 0.5;
            }
        }

        const computerX = this.x - computer.x;
        const computerY = this.y - computer.y;
        const computerDistance = Math.sqrt(computerX * computerX + computerY * computerY);

        if(computerDistance < w*0.04 + w*0.05){
            
            if (this.dx !== 0) {
                this.dx += computer.dx * 0.5;
            } else {
                this.dx = computer.dx * 0.5;
            }
            if (this.dy !== 0) {
                this.dy += computer.dy * 0.5;
            } else {
                this.dy = computer.dy * 0.5;
            }
        }

        // Friction
        this.dx *= 0.975;
        this.dy *= 0.975;
    }
}

class Computer {
    constructor(){
        this.x = w/2;
        this.y = h/10;
        this.dy = 3;
        this.dy = 3;
        this.defaultPosition = { x: this.x, y: this.y };
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, w*0.05, 0, 2*Math.PI);
        context.fillStyle = "blue";
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
        const relativeX = puck.x - this.x;
        const relativeY = puck.y - this.y
        const theta = Math.atan(relativeX/relativeY);
        const vector = 10;
        this.dx = vector*Math.sin(theta);
        this.dy = vector*Math.cos(theta);

        this.x += this.dx;
        this.y += this.dy;
    }

    return(){
        this.dx = 3;
        this.dy = 3;
        this.x += this.x > this.defaultPosition.x ? this.dx*-1 :this.dx
        this.y += this.y > this.defaultPosition.y ? this.dy*-1 :this.dy
    }
}

const player = new Player;
const puck = new Puck;
const computer = new Computer;

function animate(){
    
    context.clearRect(0,0,w,h);
    board();
    puck.update();
    player.update();
    computer.update();
    puck.draw();
    player.draw();
    computer.draw();
    requestAnimationFrame(animate);
}
animate();