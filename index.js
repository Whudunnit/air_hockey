const canvas = document.querySelector('canvas');
const w = canvas.width = 500;
const h = canvas.height = 700;
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const ComputerScoreElement = document.getElementById('computer_score');

const player = new Player;
const puck = new Puck;
const computer = new Computer;

let playerScore = 0;
let computerScore = 0;

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
