let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d"); //Here we get the canvas context. It will help us to draw on the canvas.

const SPEED_VALUE = 10;
const MAX_SPEED = 30;

// Here we set the airplane(rectangle) dimensions & position on the canvas
let rectWidth = 100;
let rectHeight = 50;
let rectX = canvas.width / 2 - rectWidth / 2;
let rectY = canvas.height - rectHeight;

// Hewe we create the enemies empty array and set the enemies dimensions.
let enemies = [];
let enemyWidth = 50;
let enemyHeight = 20;

let speed = SPEED_VALUE;
let score = 0;

let isPaused = false;
let isGameOver = false;

function drawRect() {
    // Here we draw the airplane
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "grey";
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    // Draw the enemies
    ctx.fillStyle = "black";
    enemies.forEach(function(enemy) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Here we implement the move of the airplane by the mousemove
canvas.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    rectX = event.clientX - rect.left - rectWidth / 2;
    if(rectX < 0) rectX = 0;
    if(rectX + rectWidth > canvas.width) rectX = canvas.width - rectWidth;
    drawRect();
});

// Here we implement the move of the airplane by the keyboard
window.addEventListener('keydown', function(event) {
if(event.code === 'ArrowLeft') {
rectX -= speed;
if(rectX < 0) rectX = 0;
} else if(event.code === 'ArrowRight') {
rectX += speed;
if(rectX + rectWidth > canvas.width) rectX = canvas.width - rectWidth;
}
drawRect();
});

/* Here we push the enemies, move them around the canvas and update
the scoreBoard as they are wxit the canvas */
function updateEnemies() {
    // Move all enemies
    enemies.forEach(function(enemy) {
        enemy.y += 2;
    });
    // Remove enemies that are off the canvas
    enemies = enemies.filter(function(enemy) {
        if(enemy.y < canvas.height) {
            return true;
        } else {
            ++score;
            document.getElementById("scoreBoard").textContent = score;
            return false;
        }
    });
}

// Generate new enemies randomly
setInterval(function() {
    if(isPaused || isGameOver) return;
    let x = Math.random() * (canvas.width - enemyWidth);
    enemies.push({x: x, y: 0, width: enemyWidth, height: enemyHeight});
}, 2000);

// Main loop
setInterval(function() {
    if(isPaused || isGameOver) return;
    updateEnemies();
    drawRect();
    checkCollisions();
}, 50);

// Here we check if the airplane is being hit by an enemy
function checkCollisions() {
    for(let i = 0; i < enemies.length; ++i) {
        let enemy = enemies[i];
        if(enemy.y + enemyHeight >= rectY && 
            enemy.x < rectX + rectWidth &&
            enemy.x + enemyWidth > rectX) {
            isGameOver = true;
            alert('Game Over');
            return;
            }
        }
    }

function pause() {
    isPaused = !isPaused;
    document.getElementById("pauseButton").textContent = isPaused ? 'Resume' : 'Pause';
}

function increaseSpeed() {
    if(speed < MAX_SPEED)
    speed += SPEED_VALUE;
}

function decreaseSpeed() {
    if(speed > SPEED_VALUE)
    speed -= SPEED_VALUE;
}


