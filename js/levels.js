// =============== LEVEL GENERATION SCRIPT ===============

const maxLevel = 10;

// Fix localStorage issue: ensure highestUnlocked is at least 1
let storedLevel = parseInt(localStorage.getItem("highestUnlocked"));
let highestUnlocked = (!isNaN(storedLevel) && storedLevel > 0) ? storedLevel : 1;

// Uncomment this line if you want to reset levels for testing
// localStorage.removeItem("highestUnlocked");

const levelContainer = document.querySelector(".levels");
levelContainer.innerHTML = ""; // clear previous buttons

for (let i = 1; i <= maxLevel; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Level ${i}`;
    btn.classList.add("level-btn");

    if (i > highestUnlocked) {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.textContent += " 🔒";
    }

    btn.addEventListener("click", () => {
        localStorage.setItem("selectedLevel", i);
        window.location.href = "game.html";
    });

    levelContainer.appendChild(btn);
}
