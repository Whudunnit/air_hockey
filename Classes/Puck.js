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
        
        if(this.x + w*0.04 >= w-10 || this.x - w*0.04 <= 10){
            this.dx *=-1;
        }

        if(this.y + w*0.04 >= h || this.y - w*0.04 <= 0){
            this.dy *=-1;
        }

        if(this.y - w*0.04 < 0){
            if(this.x > w/3 && this.x < 2*w/3){
                playerScore++;
                if(playerScore === 7){
                    window.alert("You Won!");
                    handleWin();
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
                if(computerScore === 7){
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