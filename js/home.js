// =============================
// SELECTORS
// =============================
const levelsContainer = document.querySelector(".levels");
const categoryBtns = document.querySelectorAll(".category-btn");
const maxLevel = 10;

// =============================
// FOODS ARRAY (UNCHANGED AS REQUESTED)
// =============================
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

// Save foods so GO/GROW/GLOW pages can access them
localStorage.setItem("foods", JSON.stringify(foods));


// =============================
// CATEGORY BUTTONS → OPEN SEPARATE PAGES
// =============================
categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;

        if (category === "GO") {
            window.location.href = "go.html";
        } 
        else if (category === "GROW") {
            window.location.href = "grow.html";
        } 
        else if (category === "GLOW") {
            window.location.href = "glow.html";
        }
    });
});


// =============================
// LEVEL BUTTONS (UNLOCK SYSTEM)
// =============================
let highestUnlocked = parseInt(localStorage.getItem("highestUnlocked")) || 1;

for (let i = 1; i <= maxLevel; i++) {
    const btn = document.createElement("button");
    btn.classList.add("level-btn");
    btn.textContent = `Level ${i}`;

    if (i > highestUnlocked) {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.textContent += " 🔒";
    }

    btn.addEventListener("click", () => {
        localStorage.setItem("selectedLevel", i);
        window.location.href = "game.html";
    });

    levelsContainer.appendChild(btn);
}
