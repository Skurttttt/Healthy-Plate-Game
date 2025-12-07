// ======================
// Healthy Food Pyramid Game
// ======================

// UPDATED: Foods array with emojis instead of images
const foods = [
    // GO Foods with emojis
    { name: "Apple", level: "GO", emoji: "🍎" },
    { name: "Rice", level: "GO", emoji: "🍚" },
    { name: "Banana", level: "GO", emoji: "🍌" },
    { name: "Bread", level: "GO", emoji: "🍞" },
    { name: "Oats", level: "GO", emoji: "🌾" },
    { name: "Orange", level: "GO", emoji: "🍊" },
    { name: "Corn", level: "GO", emoji: "🌽" },
    { name: "Potato", level: "GO", emoji: "🥔" },
    { name: "Mango", level: "GO", emoji: "🥭" },
    { name: "Pasta", level: "GO", emoji: "🍝" },

    // GROW Foods with emojis
    { name: "Chicken", level: "GROW", emoji: "🍗" },
    { name: "Egg", level: "GROW", emoji: "🥚" },
    { name: "Fish", level: "GROW", emoji: "🐟" },
    { name: "Beef", level: "GROW", emoji: "🥩" },
    { name: "Tofu", level: "GROW", emoji: "🧈" },
    { name: "Milk", level: "GROW", emoji: "🥛" },
    { name: "Cheese", level: "GROW", emoji: "🧀" },
    { name: "Yogurt", level: "GROW", emoji: "🍶" },
    { name: "Pork", level: "GROW", emoji: "🐖" },
    { name: "Shrimp", level: "GROW", emoji: "🦐" },

    // GLOW Foods with emojis
    { name: "Carrot", level: "GLOW", emoji: "🥕" },
    { name: "Spinach", level: "GLOW", emoji: "🥬" },
    { name: "Tomato", level: "GLOW", emoji: "🍅" },
    { name: "Broccoli", level: "GLOW", emoji: "🥦" },
    { name: "Cucumber", level: "GLOW", emoji: "🥒" },
    { name: "BellPepper", level: "GLOW", emoji: "🫑" },
    { name: "Lettuce", level: "GLOW", emoji: "🥬" },
    { name: "Kale", level: "GLOW", emoji: "🥬" },
    { name: "Mushroom", level: "GLOW", emoji: "🍄" },
    { name: "Peas", level: "GLOW", emoji: "🫛" },
];

const categories = ["GO","GROW","GLOW"];
const maxLevel = 10;
let currentLevel = parseInt(localStorage.getItem("selectedLevel")) || 1;
let score = 0;
let draggingFood = null;

// UPDATED: Get elements from new HTML structure
const foodPanel = document.getElementById("food-panel");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");
const playAgainBtn = document.getElementById("play-again");
const pyramidLevels = document.querySelectorAll(".pyramid-level");
const modal = document.getElementById("level-modal");
const modalMessage = document.getElementById("modal-message");
const modalBtn = document.getElementById("modal-btn");
const homeBtn = document.getElementById("home-btn");
const currentLevelDisplay = document.getElementById("current-level");

// ======================
// Helper Functions
// ======================
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function generateFoods(level) {
    const levelFoods = [];
    categories.forEach(cat => {
        const categoryFoods = foods.filter(f => f.level === cat);
        const shuffled = shuffleArray(categoryFoods.slice());
        const pickCount = Math.min(level, shuffled.length);
        for (let i = 0; i < pickCount; i++) {
            levelFoods.push(shuffled[i]);
        }
    });
    return levelFoods;
}

let levelFoods = [];

function initLevel(level) {
    // Update level display
    if (currentLevelDisplay) {
        currentLevelDisplay.textContent = level;
    }
    
    levelFoods = generateFoods(level);
    renderFoods();
    clearPyramid();
    feedback.textContent = "";
    score = 0;
    scoreDisplay.textContent = score;
}

// ======================
// Render Foods - UPDATED for emojis and new HTML structure
// ======================
function renderFoods() {
    if (!foodPanel) {
        console.error("Food panel not found!");
        return;
    }
    
    foodPanel.innerHTML = "";
    levelFoods.forEach(food => {
        const foodEl = document.createElement("div");
        foodEl.classList.add("food-item");
        foodEl.setAttribute("draggable", true);
        foodEl.setAttribute("data-level", food.level);
        foodEl.setAttribute("data-name", food.name);

        // UPDATED: Use emoji instead of image
        const emoji = document.createElement("div");
        emoji.className = "food-emoji";
        emoji.textContent = food.emoji;
        foodEl.appendChild(emoji);
        
        // Add food name
        const name = document.createElement("div");
        name.className = "food-name";
        name.textContent = food.name;
        foodEl.appendChild(name);

        foodPanel.appendChild(foodEl);

        foodEl.addEventListener("dragstart", dragStart);
        foodEl.addEventListener("touchstart", touchStart);
    });
}

// ======================
// Pyramid & Drag-Drop
// ======================
function clearPyramid() {
    if (!pyramidLevels) return;
    
    pyramidLevels.forEach(lvl => {
        // Keep only the header and description, remove placed food emojis
        const header = lvl.querySelector('.pyramid-level-header');
        const description = lvl.querySelector('.category-description');
        lvl.innerHTML = '';
        if (header) lvl.appendChild(header);
        if (description) lvl.appendChild(description);
        
        // Reset styles
        lvl.style.fontSize = "";
        lvl.style.fontWeight = "";
        lvl.style.display = "";
        lvl.style.alignItems = "";
        lvl.style.justifyContent = "";
    });
}

function dragStart(e) {
    const foodDiv = e.currentTarget;
    e.dataTransfer.setData("foodName", foodDiv.dataset.name);
    e.dataTransfer.setData("foodLevel", foodDiv.dataset.level);
    
    // UPDATED: Create a temporary element for drag image
    const emoji = foodDiv.querySelector(".food-emoji");
    if (emoji) {
        const dragImage = document.createElement("div");
        dragImage.textContent = emoji.textContent;
        dragImage.style.fontSize = "2rem";
        dragImage.style.position = "absolute";
        dragImage.style.left = "-1000px";
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 20, 20);
        setTimeout(() => document.body.removeChild(dragImage), 0);
    }
}

function touchStart(e) { 
    draggingFood = e.currentTarget; 
}

// UPDATED: Add event listeners to pyramid levels
if (pyramidLevels) {
    pyramidLevels.forEach(level => {
        level.addEventListener("dragover", e => { 
            e.preventDefault(); 
            level.classList.add("highlight"); 
        });
        level.addEventListener("dragleave", e => { 
            level.classList.remove("highlight"); 
        });
        level.addEventListener("drop", e => {
            e.preventDefault();
            level.classList.remove("highlight");
            const foodName = e.dataTransfer.getData("foodName");
            const foodLevel = e.dataTransfer.getData("foodLevel");
            handlePlacement(foodName, foodLevel, level);
        });

        level.addEventListener("touchend", e => {
            if (!draggingFood) return;
            const foodName = draggingFood.dataset.name;
            const foodLevel = draggingFood.dataset.level;
            handlePlacement(foodName, foodLevel, level);
            draggingFood = null;
        });
    });
}

// ======================
// Handle Placement - UPDATED for emojis
// ======================
function handlePlacement(foodName, foodLevel, targetLevel) {
    const target = targetLevel.dataset.level;
    const foodIndex = levelFoods.findIndex(f => f.name === foodName);
    if(foodIndex === -1) return;

    if(foodLevel === target) {
        score += 10;
        scoreDisplay.textContent = score;

        const foodEl = Array.from(foodPanel.children).find(f => f.dataset.name === foodName);
        const emoji = foodEl.querySelector(".food-emoji");
        const targetRect = targetLevel.getBoundingClientRect();
        const foodRect = foodEl.getBoundingClientRect();
        const dx = targetRect.left + targetRect.width/2 - (foodRect.left + foodRect.width/2);
        const dy = targetRect.top + targetRect.height/2 - (foodRect.top + foodRect.height/2);

        emoji.style.position = "absolute";
        emoji.style.zIndex = "1000";
        emoji.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`;
        emoji.style.transition = "transform 0.5s ease";

        setTimeout(() => {
            emoji.remove();
            // UPDATED: Create emoji instead of image
            const newEmoji = document.createElement("div");
            newEmoji.className = "food-emoji";
            newEmoji.textContent = levelFoods[foodIndex].emoji;
            newEmoji.style.fontSize = "2rem";
            newEmoji.style.margin = "5px";
            newEmoji.style.textAlign = "center";
            targetLevel.appendChild(newEmoji);

            foodEl.remove();
            levelFoods.splice(foodIndex, 1);

            feedback.textContent = "✅ Correct!";
            checkLevelComplete();
        }, 500);

    } else {
        feedback.textContent = "❌ Wrong placement!";
        showModal("Try Again!", () => initLevel(currentLevel));
    }
}

// ======================
// Check Level Completion - UPDATED to save progress
// ======================
function checkLevelComplete() {
    if(levelFoods.length === 0) {
        // Save that this level is completed
        localStorage.setItem(`level${currentLevel}Completed`, "true");
        
        let storedUnlocked = parseInt(localStorage.getItem("highestUnlocked")) || 1;
        if(currentLevel >= storedUnlocked && currentLevel < maxLevel) {
            localStorage.setItem("highestUnlocked", currentLevel + 1);
        }

        if(currentLevel < maxLevel) {
            showModal(`🎉 Passed Level ${currentLevel}! Now Level ${currentLevel + 1}`, () => {
                currentLevel++;
                localStorage.setItem("selectedLevel", currentLevel.toString());
                initLevel(currentLevel);
            });
        } else {
            showModal("🏆 Congratulations! You completed all levels!", () => {
                currentLevel = 1;
                localStorage.setItem("selectedLevel", "1");
                score = 0;
                initLevel(currentLevel);
            });
        }
    }
}

// ======================
// Modal
// ======================
function showModal(message, callback) {
    if (!modal || !modalMessage || !modalBtn) return;
    
    modalMessage.textContent = message;
    modal.style.display = "flex";
    modalBtn.onclick = () => {
        modal.style.display = "none";
        callback();
    };
}

// ======================
// Buttons
// ======================
if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
        score = 0;
        currentLevel = 1;
        localStorage.setItem("selectedLevel", "1");
        initLevel(currentLevel);
    });
}

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// ======================
// Start Game
// ======================
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update level display on page load
    if (currentLevelDisplay) {
        currentLevelDisplay.textContent = currentLevel;
    }
    
    initLevel(currentLevel);
});