import { loadJSON } from "./utils.mjs";

// Json Data
const supplementsUrl = "data/supplements.json";
const recipesUrl = "data/recipes.json"

// Select DOM Elements
const supplementsButton = document.getElementById('show-supplements-dialog');
const nutritionButton = document.getElementById('show-nutrition-dialog');
const supplementsDialog = document.getElementById('supplements-dialog');
const recipeDialog = document.getElementById('recipe-dialog');

// Navigation variables
let currentSupplementIndex = 0;
let currentRecipeIndex = 0;

// Fetch Json Supplements Data
async function loadSupplements() {
    try {
        const data = await loadJSON(supplementsUrl);
        displaySupplements(data);
    } catch (error) {
        console.error("Error loading supplements data:", error);
    }
}

// Fetch Json Nutrition Data
async function loadRecipes() {
    try {
        const data = await loadJSON(recipesUrl);
        displayRecipes(data);
    } catch (error) {
        console.error("Error loading recipes data:", error);
    }
}

// Display Supplements in Dialog
function displaySupplements(data) {
    const supplements = data.supplements[currentSupplementIndex];

    supplementsDialog.innerHTML = ``;

    // Create and Insert new content
    const header = document.createElement('div');
    header.classList.add('dialog-header');
    header.innerHTML = `
        <h3>Supplement Details</h3>
        <button id="close-supplements-dialog" class="close-btn btn-secondary">X</button>
    `;

    const body = document.createElement('div');
    body.classList.add('dialog-body');
    body.innerHTML = `
        <h4>${supplements.name}</h4>
        <p>${supplements.description}</p>
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

    // Handle Navigation Buttons
    document.getElementById("previous-supplement").addEventListener("click", () => {
        // Go to previous supplement, loop back to the end if we are at the first one
        currentSupplementIndex = (currentSupplementIndex === 0) ? data.supplements.length - 1 : currentSupplementIndex - 1;
        displaySupplements(data);
        supplementsDialog.showModal();
    });

    document.getElementById("next-supplement").addEventListener("click", () => {
        // Go to next supplement, loop back to the start if we are at the last one
        currentSupplementIndex = (currentSupplementIndex === data.supplements.length - 1) ? 0 : currentSupplementIndex + 1;
        displaySupplements(data);
        supplementsDialog.showModal();
    });

    document.getElementById("close-supplements-dialog").addEventListener("click", () => {
        supplementsDialog.close();

        // Reset the index when dialog is closed
        currentSupplementIndex = 0;
    });
}

// Display Recipes in Dialog
function displayRecipes(data) {
    const recipes = data.recipes[currentRecipeIndex];

    // Clear the dialog content
    recipeDialog.innerHTML = '';

    // Create and insert new content
    const header = document.createElement('div');
    header.classList.add('dialog-header');
    header.innerHTML = `
        <h3>Recipe Details</h3>
        <button id="close-recipe-dialog" class="close-btn btn-secondary">X</button>
    `;

    const body = document.createElement('div');
    body.classList.add('dialog-body');
    body.innerHTML = `
        <h4>${recipes.title}</h4>
        <h5>Ingredients:</h5>
        <ul>
            ${recipes.ingredients.map(ingredient => `<li>- ${ingredient}</li>`).join('')}
        </ul>
        <h5>Instructions:</h5>
        <p>${recipes.instructions}</p>
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

    // Handle Navigation Buttons
    document.getElementById("previous-recipe").addEventListener("click", () => {
        // Go to previous supplement, loop back to the end if we are at the first one
        currentRecipeIndex = (currentRecipeIndex === 0) ? data.recipes.length - 1 : currentRecipeIndex - 1;
        displayRecipes(data);
        recipeDialog.showModal();
    });

    document.getElementById("next-recipe").addEventListener("click", () => {
        // Go to next supplement, loop back to the start if we are at the last one
        currentRecipeIndex = (currentRecipeIndex === data.recipes.length - 1) ? 0 : currentRecipeIndex + 1;
        displayRecipes(data);
        recipeDialog.showModal();
    });

    document.getElementById("close-recipe-dialog").addEventListener("click", () => {
        recipeDialog.close();
        currentRecipeIndex = 0;
    });
}

// Event Listeners to Open Modals
supplementsButton.addEventListener('click', () => {
    loadSupplements();
    supplementsDialog.showModal();
});

nutritionButton.addEventListener('click', () => {
    loadRecipes();
    recipeDialog.showModal();
});