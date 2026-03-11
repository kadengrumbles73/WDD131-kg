export const recipes = [
    {
        name: "Apple Crisp",
        category: "Dessert",
        description: "This classic apple crisp is the perfect easy dessert for fall. Tart apples baked with a crunchy cinnamon-oat topping.",
        image: "images/apple-crisp.jpg",
        rating: 4,
        tags: ["apple", "oats", "cinnamon", "dessert", "sweet"]
    },
    {
        name: "Black Beans and Rice",
        category: "Main Dish",
        description: "A hearty and healthy staple featuring seasoned black beans served over fluffy white rice.",
        image: "images/black-beans-and-rice.jpg",
        rating: 4,
        tags: ["beans", "rice", "healthy", "vegan", "dinner"]
    },
    {
        name: "Chicken Curry",
        category: "Main Dish",
        description: "A rich and aromatic chicken curry simmered in a blend of traditional spices and coconut milk.",
        image: "images/chicken-curry.webp",
        rating: 5,
        tags: ["chicken", "curry", "spicy", "asian", "dinner"]
    },
    {
        name: "Chocolate Chip Cookies",
        category: "Dessert",
        description: "Chewy, buttery cookies loaded with semi-sweet chocolate chips and a hint of sea salt.",
        image: "images/chocolate-chip-cookies.jpg",
        rating: 5,
        tags: ["dessert", "chocolate", "cookies", "baking", "sweet"]
    },
    {
        name: "Escalopes de Poulet à la Crème",
        category: "Main Dish",
        description: "Tender chicken breast fillets cooked in a luxurious French cream and mushroom sauce.",
        image: "images/escalopes-de-poulet-a-la-creme.webp",
        rating: 5,
        tags: ["chicken", "french", "creamy", "dinner", "poulet"]
    },
    {
        name: "German Gooseberry Cake",
        category: "Dessert",
        description: "A traditional German Stachelbeerkuchen featuring tart gooseberries and a light sponge base.",
        image: "images/german-gooseberry-cake.jpg",
        rating: 4,
        tags: ["cake", "german", "gooseberry", "dessert", "baking"]
    },
    {
        name: "Roasted Potatoes",
        category: "Side Dish",
        description: "Crispy on the outside and fluffy on the inside, these potatoes are roasted with rosemary and garlic.",
        image: "images/roasted-potatoes.webp",
        rating: 4,
        tags: ["potatoes", "side", "roasted", "vegetables", "healthy"]
    },
    {
        name: "Chicken Pesto Pasta",
        category: "Main Dish",
        description: "A quick and flavorful pasta dish featuring grilled chicken, creamy basil pesto, and sun-dried tomatoes.",
        image: "images/pesto-pasta.jpg",
        rating: 5,
        tags: ["chicken", "pasta", "pesto", "italian", "dinner"]
    },
    {
        name: "Sweet Potato Waffles",
        category: "Breakfast",
        description: "Nutritious and delicious waffles made with mashed sweet potatoes and a hint of nutmeg.",
        image: "images/sweet-potato-waffle-md.jpg",
        rating: 4,
        tags: ["breakfast", "sweet potato", "waffles", "healthy", "brunch"]
    }
];

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= rating ? "icon-star" : "icon-star-empty";
        const starSymbol = i <= rating ? "⭐" : "☆";
        html += `<span aria-hidden="true" class="${starClass}">${starSymbol}</span>`;
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `<article class="recipe-card">
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}" class="hero-img">
        <div class="recipe-details">
            <span class="category">${recipe.category}</span>
            ${ratingTemplate(recipe.rating)}
            <p class="description">${recipe.description}</p>
        </div>
    </article>`;
}

function renderRecipes(recipeList) {
    const mainElement = document.querySelector('main');
    
    // Logic Fix: Handle empty lists so the page isn't just a white void
    if (recipeList.length === 0) {
        mainElement.innerHTML = `<p class="no-results">No recipes found matching your search.</p>`;
        return;
    }

    const html = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    mainElement.innerHTML = html;
}

function init() {
    renderRecipes(recipes);
}

function searchHandler(e) {
    e.preventDefault();
    const searchInput = document.querySelector('#search-input');
    const query = searchInput.value.trim().toLowerCase(); // Logic Fix: Added .trim() to ignore accidental spaces

    // Logic Fix: If the search is empty, show all recipes again
    if (!query) {
        renderRecipes(recipes);
        return;
    }

    const filteredRecipes = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    const sortedRecipes = filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
    renderRecipes(sortedRecipes);
}

// Logic Fix: Ensure elements exist before adding listeners to prevent console errors
const searchBtn = document.querySelector('#search-button');
const searchInp = document.querySelector('#search-input');

if (searchBtn) {
    searchBtn.addEventListener('click', searchHandler);
}

if (searchInp) {
    searchInp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchHandler(e);
    });
}

init();