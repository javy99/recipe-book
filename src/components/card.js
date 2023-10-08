/* eslint-disable */
import { toggleFavorite } from './favorites-page.js';
import { removeRecipeBtnHandler, editRecipeBtnHandler } from '../utils/eventHandlers.js';

function createRecipeCard(recipe) {
  const favoriteIconSrc = recipe.isFavorite ? 'public/images/fav-active.png' : 'public/images/fav-inactive.png';
  const favoriteIconAlt = recipe.isFavorite ? 'Favorite Icon Active' : 'Favorite Icon Inactive';

  return `
    <div class="card" data-id="${recipe.id}">
      <div class="card-header">
        <div class="card-header-left">
          <a class="icon-btn add-to-favorites" data-favorite="${recipe.isFavorite}">
            <img src="${favoriteIconSrc}" alt="${favoriteIconAlt}">
          </a>
        </div>
        <div class="card-header-right">
          <a class="icon-btn edit-btn">
              <img src="public/images/edit-inactive.png" alt="Edit Icon Inactive">
          </a>
          <a class="icon-btn remove-btn">
              <img src="public/images/remove-inactive.png" alt="Remove Icon Inactive">
          </a>
        </div>
      </div>
      <div class="card-footer">
          <div class="card-footer-left">
            <h3 class="card-title">${recipe.name}</h3>
            <span class="card-text">${recipe.ingredients.length} ingredients</span>
          </div>
          <div class="card-footer-right">
            <span class="card-text">${recipe.cookingTime} min.</span>
          </div>
      </div>
    </div>
  `;
}

export function renderRecipes(recipes, rowSelector, filterCondition = null) {
  const row = document.querySelector(rowSelector);

  let filteredRecipes = recipes;
  if (filterCondition) {
    filteredRecipes = recipes.filter(filterCondition);
  }

  filteredRecipes.forEach((recipe) => {
    row.innerHTML += createRecipeCard(recipe);
  });

  addToFavorite();
  removeRecipeBtnHandler();
  editRecipeBtnHandler(recipes);

}

export function addToFavorite() {
  document.querySelectorAll('.add-to-favorites').forEach((button) => {
    button.addEventListener('click', function (event) {
      event.stopPropagation();

      const parentContainer = this.closest('[data-id]');
      if (!parentContainer) {
        console.error('Parent container with data-id attribute not found.');
        return;
      }

      const recipeId = parentContainer.getAttribute('data-id');
      toggleFavorite(recipeId);
    });
  });
}
