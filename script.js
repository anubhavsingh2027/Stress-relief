const gameArea = document.getElementById('gameArea');
const bubblesContainer = document.getElementById('bubbles');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

const popSound = document.getElementById('popSound');
const powerUpSound = document.getElementById('powerUpSound');
const explosionSound = document.getElementById('explosionSound');

let score = 0;
let time = 30;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;
let bubbleInterval;
let isPaused = false;

highScoreDisplay.textContent = `High Score: ${highScore}`;

// Function to create a bubble
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 50 + 30; // Random size between 30px and 80px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * (gameArea.offsetWidth - size)}px`;
    bubble.style.top = `${Math.random() * (gameArea.offsetHeight - size)}px`;

    // Assign random bubble type
    const bubbleTypes = ['normal', 'fast', 'exploding', 'powerUp'];
    const type = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
    bubble.classList.add(type);

    // Add event listener for popping bubbles
    bubble.addEventListener('click', () => {
        if (type === 'exploding') {
            explosionSound.play();
            time -= 2; // Penalty for exploding bubbles
        } else if (type === 'powerUp') {
            powerUpSound.play();
            time += 5; // Bonus time for power-ups
        } else {
            popSound.play();
            score += type === 'fast' ? 2 : 1; // Double points for fast bubbles
        }
        scoreDisplay.textContent = `Score: ${score}`;
        bubble.remove();
    });

    bubblesContainer.appendChild(bubble);
}

// Function to start the game
function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${time}`;
    bubblesContainer.innerHTML = ''; // Clear existing bubbles
    isPaused = false;

    // Start creating bubbles
    bubbleInterval = setInterval(createBubble, 500);

    // Start the timer
    gameInterval = setInterval(() => {
        if (!isPaused) {
            time--;
            timerDisplay.textContent = `Time: ${time}`;
            if (time <= 0) {
                clearInterval(gameInterval);
                clearInterval(bubbleInterval);
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('highScore', highScore);
                    highScoreDisplay.textContent = `High Score: ${highScore}`;
                }
                alert(`Game Over! Your score is ${score}.`);
            }
        }
    }, 1000);
}

// Event listener for the start button
startBtn.addEventListener('click', startGame);

// Event listener for the pause button
pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
});