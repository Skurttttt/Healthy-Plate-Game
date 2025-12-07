// Same food list used in game.js but with emojis instead of images
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

function loadCategory(type) {
    const container = document.getElementById("category-list");
    container.innerHTML = "";

    const list = foods.filter(f => f.level === type);

    list.forEach(food => {
        const item = document.createElement("div");
        item.classList.add("food-item");

        item.innerHTML = `
            <div class="food-emoji">${food.emoji}</div>
            <div class="food-name">${food.name}</div>
            <div class="food-tag">${type} FOOD</div>
        `;

        container.appendChild(item);
    });
}