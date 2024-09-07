// Initialize Telegram Web App object
const tg = window.Telegram.WebApp;

// Define the mountain levels and the score needed to unlock them
const mountains = [
    { name: "Mount Fuji", height: 3776, scoreNeeded: 10 },
    { name: "Mount Kilimanjaro", height: 5895, scoreNeeded: 20 },
    { name: "Mount Denali", height: 6190, scoreNeeded: 30 },
    { name: "Mount Aconcagua", height: 6961, scoreNeeded: 40 },
    { name: "Mount Everest", height: 8848, scoreNeeded: 50 }
];

// Initialize game variables
let score = 0;
let currentLevel = -1;

const scoreElement = document.getElementById("score");
const mountainElement = document.getElementById("current-mountain");
const unlockedMessageElement = document.getElementById("unlocked-message");
const climbButton = document.getElementById("climb-button");

// Function to update the score
function updateScore() {
    score++;
    scoreElement.innerText = `Score: ${score}`;

    // Check if a new mountain level is unlocked
    if (currentLevel < mountains.length - 1 && score >= mountains[currentLevel + 1].scoreNeeded) {
        currentLevel++;
        const mountain = mountains[currentLevel];
        mountainElement.innerText = `Current Mountain: ${mountain.name} (${mountain.height} meters)`;
        unlockedMessageElement.innerText = `Congratulations! You've unlocked ${mountain.name} at ${mountain.height} meters!`;

        // Bounce animation
        unlockedMessageElement.style.animation = "bounce 0.5s ease-in-out";
        setTimeout(() => unlockedMessageElement.style.animation = "", 500);

        // Send the score and mountain information to Telegram
        tg.sendData(JSON.stringify({
            message: `Unlocked ${mountain.name}`,
            score: score
        }));
    } else if (currentLevel >= mountains.length - 1) {
        unlockedMessageElement.innerText = "You've reached the top of Mount Everest!";
    }
}

// Event listener for climb button
climbButton.addEventListener("click", updateScore);

// Expand the web app UI to take the full screen within Telegram
tg.expand();
