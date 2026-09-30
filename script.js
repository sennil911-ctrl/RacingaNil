const car = document.getElementById("car");
const enemy = document.getElementById("enemy");
const coin = document.getElementById("coin");
const coinsText = document.getElementById("coinsText");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");

let carX = 125;

let enemyY = -150;
let enemyX = 20;

let coinY = -300;
let coinX = 125;

let score = 0;
let coins = 0;

let speed = 5;
let highScore = localStorage.getItem("highScore") || 0;
let running = true;

const lanes = [20, 125, 230];

// Starting position
car.style.left = carX + "px";

enemy.style.left = enemyX + "px";
enemyY += speed;
enemy.style.top = enemyY + "px";

coin.style.left = coinX + "px";
coin.style.top = coinY + "px";

// Car movement
document.addEventListener("keydown", function(event) {

    if (!running) return;

    if (event.key === "ArrowLeft") {
        carX -= 105;

        if (carX < 20) {
            carX = 20;
        }

        car.style.left = carX + "px";
    }

    if (event.key === "ArrowRight") {
        carX += 105;

        if (carX > 230) {
            carX = 230;
        }

        car.style.left = carX + "px";
    }
});

// Game loop
function gameLoop() {

    if (!running) return;

    // Enemy movement
    enemyY += speed;
    enemy.style.top = enemyY + "px";

    // Enemy वापस ऊपर
    if (enemyY > 700) {

    enemyY = -150;

    enemyX = lanes[Math.floor(Math.random() * lanes.length)];

    enemy.style.left = enemyX + "px";

    score = score + 1;

    scoreText.innerText = "Score: " + score;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreText.innerText = "High Score: " + highScore;
    }

    // हर 5 Score पर speed बढ़ेगी
    if (score % 5 === 0) {
        speed = speed + 0.5;
    }
}

    // Coin movement
    coinY += speed;
    coin.style.top = coinY + "px";

    // Coin वापस ऊपर
    if (coinY > 700) {

        coinY = -300;

        coinX = lanes[Math.floor(Math.random() * lanes.length)];

        coin.style.left = coinX + "px";
    }

    // Coin collect
    if (
        coinY > 480 &&
        coinY < 600 &&
        Math.abs(carX - coinX) < 60
    ) {

        coins++;

        coinY = -300;
coinsText.innerText = "Coins: " + coins;
        coinX = lanes[Math.floor(Math.random() * lanes.length)];

        coin.style.left = coinX + "px";

        console.log("Coins: " + coins);
    }

    // Enemy collision
    // ENEMY COLLISION
const carRect = car.getBoundingClientRect();
const enemyRect = enemy.getBoundingClientRect();

const collision =
    carRect.left < enemyRect.right &&
    carRect.right > enemyRect.left &&
    carRect.top < enemyRect.bottom &&
    carRect.bottom > enemyRect.top;

if (collision) {
    running = false;
    gameOver.style.display = "block";
}
    requestAnimationFrame(gameLoop);
}

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    running = true;
    gameLoop();
});

restartButton.addEventListener("click", function () {
    location.reload();
});
