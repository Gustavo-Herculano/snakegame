let canvas = document.getElementById('snake');
let context = canvas.getContext("2d");
let box = 20;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let comida = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
}

function criarBG() {
    context.fillStyle = "rgb(6, 9, 29)";
    context.fillRect(0, 0, 25 * box, 25 * box);
}

function criarSnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box - 1, box - 1);
    }
}

function criarComida() {
    context.fillStyle = "rgb(241, 15, 83)";
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarGame() {

    if(snake[0].x > 24 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 25 * box;
    if(snake[0].y > 24 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 25 * box; 

    for(let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Voce Perdeu :(')
        }
    }

    criarBG();
    criarSnake();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != comida.x || snakeY != comida.y) {
        snake.pop();
    }
    else {
        comida.x = Math.floor(Math.random() * 24 + 1) * box;
        comida.y = Math.floor(Math.random() * 24 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(iniciarGame, 100);


