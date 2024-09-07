// script.js

const mountains = [
    { name: "Mount Fuji", height: 3776, scoreNeeded: 10 },
    { name: "Mount Kilimanjaro", height: 5895, scoreNeeded: 20 },
    { name: "Mount Denali", height: 6190, scoreNeeded: 30 },
    { name: "Mount Aconcagua", height: 6961, scoreNeeded: 40 },
    { name: "Mount Everest", height: 8848, scoreNeeded: 50 }
];

let score = 0;
let currentLevel = -1;

const scoreElement = document.getElementById("score");
const mountainElement = document.getElementById("current-mountain");
const unlockedMessageElement = document.getElementById("unlocked-message");

document.getElementById("tap-button").addEventListener("click", function() {
    score++;
    scoreElement.innerText = `Score: ${score}`;

    // Check if a new mountain level is unlocked
    if (currentLevel < mountains.length - 1) {
        if (score >= mountains[currentLevel + 1].scoreNeeded) {
            currentLevel++;
            const mountain = mountains[currentLevel];
            mountainElement.innerText = `Current Mountain: ${mountain.name} (${mountain.height} meters)`;
            unlockedMessageElement.innerText = `Congratulations! You've unlocked ${mountain.name} at ${mountain.height} meters!`;
            unlockedMessageElement.style.animation = "bounce 0.5s ease-in-out";
            setTimeout(() => unlockedMessageElement.style.animation = "", 500);
        }
    }

    // Send score update to Telegram bot
    sendScoreToBot(score);
});

function sendScoreToBot(score) {
    if (window.Telegram.WebApp) {
        Telegram.WebApp.sendData(JSON.stringify({ score: score }));
    }
}
