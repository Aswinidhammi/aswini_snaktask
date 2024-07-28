document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const playAgainBtn = document.getElementById('playAgainBtn');
    
    canvas.width = 400;
    canvas.height = 400;
    
    const gridSize = 20;
    const tileSize = canvas.width / gridSize;

    let snake = [];
    let snakeLength = 1;
    let snakeDirection = 'right';
    let food = {};
    let isGameOver = false;
    let interval;

    function initializeGame() {
        snake = [{ x: 5, y: 5 }];
        snakeLength = 1;
        snakeDirection = 'right';
        isGameOver = false;
        placeFood();
        document.addEventListener('keydown', changeDirection);
        interval = setInterval(updateGame, 100);
        playAgainBtn.style.display = 'none';
    }

    function updateGame() {
        if (isGameOver) return;

        moveSnake();
        if (checkCollision()) {
            clearInterval(interval);
            alert('Game Over!');
            playAgainBtn.style.display = 'block';
            return;
        }
        if (snake[0].x === food.x && snake[0].y === food.y) {
            snakeLength++;
            placeFood();
        }
        drawGame();
    }

    function moveSnake() {
        const head = { ...snake[0] };
        switch (snakeDirection) {
            case 'right':
                head.x++;
                break;
            case 'left':
                head.x--;
                break;
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
        }
        snake.unshift(head);
        if (snake.length > snakeLength) {
            snake.pop();
        }
    }

    function changeDirection(event) {
        const key = event.key;
        switch (key) {
            case 'ArrowUp':
                if (snakeDirection !== 'down') snakeDirection = 'up';
                break;
            case 'ArrowDown':
                if (snakeDirection !== 'up') snakeDirection = 'down';
                break;
            case 'ArrowLeft':
                if (snakeDirection !== 'right') snakeDirection = 'left';
                break;
            case 'ArrowRight':
                if (snakeDirection !== 'left') snakeDirection = 'right';
                break;
        }
    }

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        return false;
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the snake
        ctx.fillStyle = 'blue';
        snake.forEach(part => {
            ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
        });

        // Draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
    }

    function restartGame() {
        initializeGame();
    }

    playAgainBtn.addEventListener('click', restartGame);

    initializeGame();
});
