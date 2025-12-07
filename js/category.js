// Same food list used in game.js
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

function loadCategory(type) {
    const container = document.getElementById("category-list");
    container.innerHTML = "";

    const list = foods.filter(f => f.level === type);

    list.forEach(food => {
        const item = document.createElement("div");
        item.classList.add("food-item");

        item.innerHTML = `
            <img src="${food.img}" alt="${food.name}">
            <span>${food.name}</span>
        `;

        container.appendChild(item);
    });
}
