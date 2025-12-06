// ======================
// Healthy Food Pyramid Game
// ======================

// Original foods array (keep as before)
const foods = [
    { name: "Apple", level: "GO", img: "assets/images/apple.png" },
    { name: "Rice", level: "GO", img: "assets/images/rice.png" },
    { name: "Banana", level: "GO", img: "assets/images/banana.png" },
    { name: "Bread", level: "GO", img: "assets/images/bread.png" },
    { name: "Oats", level: "GO", img: "assets/images/oats.png" },
    { name: "Orange", level: "GO", img: "assets/images/orange.png" },
    { name: "Corn", level: "GO", img: "assets/images/corn.png" },
    { name: "Potato", level: "GO", img: "assets/images/potato.png" },
    { name: "Mango", level: "GO", img: "assets/images/mango.png" },
    { name: "Pasta", level: "GO", img: "assets/images/pasta.png" },

    { name: "Chicken", level: "GROW", img: "assets/images/chicken.png" },
    { name: "Egg", level: "GROW", img: "assets/images/egg.png" },
    { name: "Fish", level: "GROW", img: "assets/images/fish.png" },
    { name: "Beef", level: "GROW", img: "assets/images/beef.png" },
    { name: "Tofu", level: "GROW", img: "assets/images/tofu.png" },
    { name: "Milk", level: "GROW", img: "assets/images/milk.png" },
    { name: "Cheese", level: "GROW", img: "assets/images/cheese.png" },
    { name: "Yogurt", level: "GROW", img: "assets/images/yogurt.png" },
    { name: "Pork", level: "GROW", img: "assets/images/pork.png" },
    { name: "Shrimp", level: "GROW", img: "assets/images/shrimp.png" },

    { name: "Carrot", level: "GLOW", img: "assets/images/carrot.png" },
    { name: "Spinach", level: "GLOW", img: "assets/images/spinach.png" },
    { name: "Tomato", level: "GLOW", img: "assets/images/tomato.png" },
    { name: "Broccoli", level: "GLOW", img: "assets/images/broccoli.png" },
    { name: "Cucumber", level: "GLOW", img: "assets/images/cucumber.png" },
    { name: "BellPepper", level: "GLOW", img: "assets/images/bellpepper.png" },
    { name: "Lettuce", level: "GLOW", img: "assets/images/lettuce.png" },
    { name: "Kale", level: "GLOW", img: "assets/images/kale.png" },
    { name: "Mushroom", level: "GLOW", img: "assets/images/mushroom.png" },
    { name: "Peas", level: "GLOW", img: "assets/images/peas.png" },
];

const categories = ["GO","GROW","GLOW"];
const maxLevel = 10;
let currentLevel = parseInt(localStorage.getItem("selectedLevel")) || 1;
let score = 0;
let draggingFood = null;

const foodPanel = document.querySelector(".food-panel");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");
const playAgainBtn = document.getElementById("play-again");
const pyramidLevels = document.querySelectorAll(".pyramid-level");
const modal = document.getElementById("level-modal");
const modalMessage = document.getElementById("modal-message");
const modalBtn = document.getElementById("modal-btn");
const homeBtn = document.getElementById("home-btn");

// ======================
// Helper
// ======================
function shuffleArray(arr){
    return arr.sort(()=> Math.random() - 0.5);
}

function generateFoods(level){
    const levelFoods = [];
    categories.forEach(cat=>{
        const categoryFoods = foods.filter(f => f.level === cat);
        const shuffled = shuffleArray(categoryFoods.slice());
        const pickCount = Math.min(level, shuffled.length);
        for(let i=0;i<pickCount;i++){
            levelFoods.push(shuffled[i]);
        }
    });
    return levelFoods;
}

let levelFoods = [];

function initLevel(level){
    levelFoods = generateFoods(level);
    renderFoods();
    clearPyramid();
    feedback.textContent = "";
}

function renderFoods(){
    foodPanel.innerHTML = "";
    levelFoods.forEach(food=>{
        const foodEl = document.createElement("div");
        foodEl.classList.add("food-item");
        foodEl.setAttribute("draggable", true);
        foodEl.setAttribute("data-level", food.level);
        foodEl.setAttribute("data-name", food.name);

        const img = document.createElement("img");
        img.src = food.img;
        img.alt = food.name;
        foodEl.appendChild(img);

        foodPanel.appendChild(foodEl);

        foodEl.addEventListener("dragstart", dragStart);
        foodEl.addEventListener("touchstart", touchStart);
    });
}

function clearPyramid(){
    pyramidLevels.forEach(lvl=> lvl.innerHTML = lvl.dataset.level);
}

function dragStart(e){
    const foodDiv = e.currentTarget;
    e.dataTransfer.setData("foodName", foodDiv.dataset.name);
    e.dataTransfer.setData("foodLevel", foodDiv.dataset.level);
    const img = foodDiv.querySelector("img");
    if(img) e.dataTransfer.setDragImage(img, img.width/2, img.height/2);
}

function touchStart(e){ draggingFood = e.currentTarget; }

pyramidLevels.forEach(level=>{
    level.addEventListener("dragover", e=>{ e.preventDefault(); level.classList.add("highlight"); });
    level.addEventListener("dragleave", e=>{ level.classList.remove("highlight"); });
    level.addEventListener("drop", e=>{
        e.preventDefault();
        level.classList.remove("highlight");
        const foodName = e.dataTransfer.getData("foodName");
        const foodLevel = e.dataTransfer.getData("foodLevel");
        handlePlacement(foodName, foodLevel, level);
    });

    level.addEventListener("touchend", e=>{
        if(!draggingFood) return;
        const foodName = draggingFood.dataset.name;
        const foodLevel = draggingFood.dataset.level;
        handlePlacement(foodName, foodLevel, level);
        draggingFood = null;
    });
});

function handlePlacement(foodName, foodLevel, targetLevel){
    const target = targetLevel.dataset.level;
    const foodIndex = levelFoods.findIndex(f=>f.name===foodName);
    if(foodIndex===-1) return;

    if(foodLevel === target){
        score += 10;
        scoreDisplay.textContent = score;

        const foodEl = Array.from(foodPanel.children).find(f=>f.dataset.name===foodName);
        const img = foodEl.querySelector("img");
        const targetRect = targetLevel.getBoundingClientRect();
        const foodRect = foodEl.getBoundingClientRect();
        const dx = targetRect.left + targetRect.width/2 - (foodRect.left + foodRect.width/2);
        const dy = targetRect.top + targetRect.height/2 - (foodRect.top + foodRect.height/2);

        img.style.position = "absolute";
        img.style.zIndex = "1000";
        img.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`;
        img.style.transition = "transform 0.5s ease";

        setTimeout(()=>{
            img.remove();
            const newImg = document.createElement("img");
            newImg.src = levelFoods[foodIndex].img;
            newImg.alt = levelFoods[foodIndex].name;
            newImg.style.width = "50px";
            newImg.style.height = "50px";
            newImg.style.margin = "2px";
            targetLevel.appendChild(newImg);

            foodEl.remove();
            levelFoods.splice(foodIndex,1);

            feedback.textContent = "✅ Correct!";
            checkLevelComplete();
        },500);

    } else {
        feedback.textContent = "❌ Wrong placement!";
        showModal("Try Again!", ()=>initLevel(currentLevel));
    }
}

function checkLevelComplete(){
    if(levelFoods.length===0){
        let highestUnlocked = parseInt(localStorage.getItem("highestUnlocked")) || 1;
        if(currentLevel >= highestUnlocked && currentLevel < maxLevel){
            localStorage.setItem("highestUnlocked", currentLevel + 1);
        }

        if(currentLevel<maxLevel){
            showModal(`🎉 Passed Level ${currentLevel}! Now Level ${currentLevel+1}`, ()=>{
                currentLevel++;
                initLevel(currentLevel);
            });
        } else {
            showModal("🏆 Congratulations! You completed all levels!", ()=>{
                currentLevel=1;
                score=0;
                initLevel(currentLevel);
            });
        }
    }
}

function showModal(message, callback){
    modalMessage.textContent = message;
    modal.style.display = "flex";
    modalBtn.onclick = ()=>{
        modal.style.display = "none";
        callback();
    };
}

playAgainBtn.addEventListener("click", ()=>{
    score = 0;
    currentLevel = 1;
    initLevel(currentLevel);
});

// Back to Home
homeBtn.addEventListener("click", ()=>{
    window.location.href = "index.html";
});

// Start Game
initLevel(currentLevel);
