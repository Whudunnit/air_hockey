const canvas = document.querySelector('canvas');
const w = canvas.width = 500;
const h = canvas.height = 700;
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const ComputerScoreElement = document.getElementById('computer_score');


const backgroundImage = new Image();
backgroundImage.src = 'hockey_board.png';

backgroundImage.onload = function() {
    // Draw the background image
    context.drawImage(backgroundImage, 0, 0, w, h);
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
        context.fillStyle = "blue";
        context.fill();
        context.stroke();
    }

    update(){
        this.dx = this.x - this.prevX;
        this.dy = this.y - this.prevY;
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = Math.max(Math.min(this.x, w - w*0.05), w*0.05);
        this.y = Math.max(Math.min(this.y, h - w * 0.05), w*0.05);       
    }
}

let playerScore = 0;
let computerScore = 0;

class Puck {
    constructor(){
        this.x = w/2;
        this.y = h/2;
        this.dx = 0;
        this.dy = 0;
        this.maxVelocity = 10;
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
        this.dx = Math.max(Math.min(this.dx, this.maxVelocity), -this.maxVelocity);
        this.dy = Math.max(Math.min(this.dy, this.maxVelocity), -this.maxVelocity);

        if(this.x + w*0.04 >= w || this.x - w*0.04 <= 0){
            this.dx *=-1;
        }

        if(this.y + w*0.04 >= h || this.y - w*0.04 <= 0){
            this.dy *=-1;
        }

        if(this.y - w*0.04 < 0){
            if(this.x > w/3 && this.x < 2*w/3){
                playerScore++;
                if(playerScore == 11){
                    window.alert("You Won!");
                    playerScore = 0;
                    computerScore = 0;
                    ComputerScoreElement.textContent = 'Computer score: ' + computerScore;
                }
                scoreElement.textContent = 'Player score: ' + playerScore;
                this.x = w/2;
                this.y = h/2;
                this.dx = 0;
                this.dy = 0;
                redrawBoard(player, computer);
            }
        }
        else if(this.y + w*0.04 > h){
            if(this.x >w/3 && this.x < 2*w/3){
                computerScore++;
                if(computerScore == 11){
                    window.alert("The Computer Won!");
                    playerScore = 0;
                    computerScore = 0;
                    scoreElement.textContent = 'Player score: ' + playerScore;
                }
                ComputerScoreElement.textContent = 'Computer score: ' + computerScore;
                this.x = w/2;
                this.y = h/2;
                this.dx = 0;
                this.dy = 0;
                redrawBoard(player, computer);
            }
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
        this.dx *= 0.99;
        this.dy *= 0.99;
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

function redrawBoard() {
    player.draw();
    computer.draw();
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetBoard);

function resetBoard(){
    puck.x = w / 2;
    puck.y = h / 2;
    puck.dx = 0;
    puck.dy = 0;
};

const player = new Player;
const puck = new Puck;
const computer = new Computer;

function animate(){

    context.drawImage(backgroundImage, 0, 0, w, h);
    puck.update();
    player.update();
    computer.update();
    player.draw();
    computer.draw();
    puck.draw();
    requestAnimationFrame(animate);
}
animate();
