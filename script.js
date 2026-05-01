const canvas = document.getElementById('game-canvas');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const shotSound = document.getElementById('shot-sound');

let score = 0;
let timeLeft = 30;
let gameActive = true;

window.addEventListener('mousedown', () => {
    if (!gameActive) return;
    shotSound.currentTime = 0;
    shotSound.play();
});

function createDuck() {
    if (!gameActive) return;

    const duck = document.createElement('div');
    duck.className = 'duck';
    
    const startY = Math.random() * (window.innerHeight - 150) + 50;
    duck.style.top = `${startY}px`;
    duck.style.left = `-100px`;

    canvas.appendChild(duck);

    let posX = -100;
    const speed = Math.random() * 3 + 2;

    const moveInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(moveInterval);
            return;
        }

        posX += speed;
        duck.style.left = `${posX}px`;

        if (posX > window.innerWidth) {
            duck.remove();
            clearInterval(moveInterval);
        }
    }, 16);

    duck.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        score++;
        scoreEl.textContent = score;
        duck.classList.add('dead');
        
        setTimeout(() => {
            duck.remove();
            clearInterval(moveInterval);
        }, 500);
    });
}

const gameTimer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}, 1000);

const spawnInterval = setInterval(createDuck, 1000);

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearInterval(spawnInterval);
    alert(`O'yin tugadi! Sizning ochkongiz: ${score}`);
    location.reload(); 
}