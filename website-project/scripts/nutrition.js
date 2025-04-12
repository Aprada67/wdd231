import { loadJSON } from "./utils.mjs";

// JSON Data
const supplementsUrl = "data/supplements.json";
const recipesUrl = "data/recipes.json";

// Select DOM Elements
const supplementsButton = document.getElementById('show-supplements-dialog');
const nutritionButton = document.getElementById('show-nutrition-dialog');
const supplementsDialog = document.getElementById('supplements-dialog');
const recipeDialog = document.getElementById('recipe-dialog');

// Navigation variables
let currentSupplementIndex = 0;
let currentRecipeIndex = 0;

// Load Supplements Data
async function loadSupplements() {
    try {
        const data = await loadJSON(supplementsUrl);
        displaySupplements(data);
    } catch (error) {
        console.error("Error loading supplements data:", error);
    }
}

// Load Recipes Data
async function loadRecipes() {
    try {
        const data = await loadJSON(recipesUrl);
        displayRecipes(data);
    } catch (error) {
        console.error("Error loading recipes data:", error);
    }
}

// Display Supplements
function displaySupplements(data) {
    const supplement = data.supplements[currentSupplementIndex];

    supplementsDialog.innerHTML = '';

    const header = document.createElement('div');
    header.classList.add('dialog-header');
    header.innerHTML = `
        <h3>Supplement Details</h3>
        <button id="close-supplements-dialog" class="close-btn">Close</button>
    `;

    const body = document.createElement('div');
    body.classList.add('dialog-body');
    body.innerHTML = `
        <img src="${supplement.image}" alt="${supplement.name}" class="dialog-image">
        <h4>${supplement.name}</h4>
        <p>${supplement.description}</p>
    `;

    const footer = document.createElement('div');
    footer.classList.add('dialog-footer');
    footer.innerHTML = `
        <button id="previous-supplement">Previous</button>
        <button id="next-supplement">Next</button>
    `;

    supplementsDialog.appendChild(header);
    supplementsDialog.appendChild(body);
    supplementsDialog.appendChild(footer);

    document.getElementById('close-supplements-dialog').addEventListener('click', () => {
        supplementsDialog.close();
        currentSupplementIndex = 0;
    });

    document.getElementById('previous-supplement').addEventListener('click', () => {
        currentSupplementIndex = (currentSupplementIndex === 0) ? data.supplements.length - 1 : currentSupplementIndex - 1;
        displaySupplements(data);
        supplementsDialog.showModal();
    });

    document.getElementById('next-supplement').addEventListener('click', () => {
        currentSupplementIndex = (currentSupplementIndex === data.supplements.length - 1) ? 0 : currentSupplementIndex + 1;
        displaySupplements(data);
        supplementsDialog.showModal();
    });
}

// Display Recipes
function displayRecipes(data) {
    const recipe = data.recipes[currentRecipeIndex];

    recipeDialog.innerHTML = '';

    const header = document.createElement('div');
    header.classList.add('dialog-header');
    header.innerHTML = `
        <h3>Recipe Details</h3>
        <button id="close-recipe-dialog" class="close-btn">Close</button>
    `;

    const body = document.createElement('div');
    body.classList.add('dialog-body');
    body.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="dialog-image">
        <h4>${recipe.title}</h4>
        <h5>Ingredients:</h5>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>- ${ingredient}</li>`).join('')}
        </ul>
        <h5>Instructions:</h5>
        <p>${recipe.instructions}</p>
    `;

    const footer = document.createElement('div');
    footer.classList.add('dialog-footer');
    footer.innerHTML = `
        <button id="previous-recipe">Previous</button>
        <button id="next-recipe">Next</button>
    `;

    recipeDialog.appendChild(header);
    recipeDialog.appendChild(body);
    recipeDialog.appendChild(footer);

    document.getElementById('close-recipe-dialog').addEventListener('click', () => {
        recipeDialog.close();
        currentRecipeIndex = 0;
    });

    document.getElementById('previous-recipe').addEventListener('click', () => {
        currentRecipeIndex = (currentRecipeIndex === 0) ? data.recipes.length - 1 : currentRecipeIndex - 1;
        displayRecipes(data);
        recipeDialog.showModal();
    });

    document.getElementById('next-recipe').addEventListener('click', () => {
        currentRecipeIndex = (currentRecipeIndex === data.recipes.length - 1) ? 0 : currentRecipeIndex + 1;
        displayRecipes(data);
        recipeDialog.showModal();
    });
}

// Event Listeners
supplementsButton.addEventListener('click', () => {
    loadSupplements();
    supplementsDialog.showModal();
});

nutritionButton.addEventListener('click', () => {
    loadRecipes();
    recipeDialog.showModal();
});