const bballMonster = {
    name: "Slam-Dunk Shadow",
    class: "All-Star Beast",
    level: 1,
    health: 140,
    image: "images/dunk.png",

    attacked: function() {
        if (this.health > 0) {
            this.health -= 20;
            if (this.health <= 0) {
                this.health = 0;
                alert(`${this.name} has fouled out (Died)!`);
            }
        }
        updateUI();
    },

    levelUp: function() {
        this.level += 1;
        // The monster gets a heating up bonus
        this.health += 15; 
        updateUI();
    }
};


function updateUI() {
    document.getElementById("char-name").textContent = bballMonster.name;
    document.getElementById("char-class").textContent = bballMonster.class;
    document.getElementById("char-level").textContent = bballMonster.level;
    document.getElementById("char-health").textContent = bballMonster.health;
    document.getElementById("char-img").src = bballMonster.image;
}

// Event Listeners: Connect the HTML buttons to the object methods
document.getElementById("attack-btn").addEventListener("click", () => {
    bballMonster.attacked();
});

document.getElementById("level-btn").addEventListener("click", () => {
    bballMonster.levelUp();
});

// Initial call to display the starting stats when the page loads
updateUI();