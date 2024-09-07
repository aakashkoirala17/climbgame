// Initialize the Telegram Web App object
const tg = window.Telegram.WebApp;

// Define the mountains and the score needed to unlock each
const mountains = [
    { name: "Mount Fuji", height: 3776, scoreNeeded: 10 },
    { name: "Mount Kilimanjaro", height: 5895, scoreNeeded: 20 },
    { name: "Mount Denali", height: 6190, scoreNeeded: 30 },
    { name: "Mount Aconcagua", height: 6961, scoreNeeded: 40 },
    { name: "Mount Everest", height: 8848, scoreNeeded: 50 }
];

// Initialize variables for the game
let score = 0;
let currentLevel = -1;

// Get the HTML elements
const scoreElement = document.getElementById("score");
const mountainElement = document.getElementById("current-mountain");
const unlockedMessageElement = document.getElementById("unlocked-message");
const climbButton = document.getElementById("climb-button");

// Debugging: Check if the DOM elements are being selected correctly
console.log(climbButton);  // Should log the button element

// Add event listener to the button for user interaction
climbButton.addEventListener("click", function() {
    // Increment the score
    score++;
    console.log("Button clicked! Current score:", score);  // Debugging log
    scoreElement.innerText = `Score: ${score}`;

    // Check if the user has unlocked a new mountain level
    if (currentLevel < mountains.length - 1 && score >= mountains[currentLevel + 1].scoreNeeded) {
        currentLevel++;
        const mountain = mountains[currentLevel];
        mountainElement.innerText = `Current Mountain: ${mountain.name} (${mountain.height} meters)`;
        unlockedMessageElement.innerText = `You've unlocked ${mountain.name} at ${mountain.height} meters!`;

        // Add bounce animation when a new mountain is unlocked
        unlockedMessageElement.classList.add("unlocked-bounce");
        setTimeout(() => unlockedMessageElement.classList.remove("unlocked-bounce"), 500);

        // Send the updated score and mountain info to Telegram bot
        tg.sendData(JSON.stringify({
            message: `Unlocked ${mountain.name}`,
            score: score
        }));
    } else if (currentLevel >= mountains.length - 1) {
        unlockedMessageElement.innerText = "You've reached the top of Mount Everest!";
    }
});

// Expand the web app within the Telegram window

