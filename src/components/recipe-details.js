/* eslint-disable */
import { addToFavorite } from './card.js';
import { removeRecipeBtnHandler, editRecipeBtnHandler } from '../utils/eventHandlers.js';

function renderRecipeDetails(recipe) {
  const favoriteIconSrc = recipe.isFavorite ? 'public/images/fav-active.png' : 'public/images/fav-inactive-details.png';
  const favoriteIconAlt = recipe.isFavorite ? 'Favorite Icon Active' : 'Favorite Icon Inactive';

  return `
    <div class="recipe-details-overlay">
      <div id="recipe-details" data-id="${recipe.id}">
        <div class="recipe-details-header">
          <img src="public/images/big-bg.jpg" alt="Resize Details Image">
          <a class="close-btn">
            <img src="public/images/close-icon.png" alt="Close Icon">
          </a>
        </div>
        <div class="recipe-details-body">
          <div class="recipe-main-details">
            <h2 class="secondary-title recipe-details-title">${recipe.name}</h2>
            <h2 class="secondary-title">${recipe.cookingTime} min.</h2>
          </div>
          <p class="recipe-details-description">${recipe.description}</p>
          <h3 class="recipe-details-subtitle">Ingredients</h3>
          <ul class="ingredients-lists"></ul>
        </div>
        <div class="recipe-details-footer">
          <div class="left">
            <a class="add-to-favorites" data-favorite="${recipe.isFavorite}">
              <img src="${favoriteIconSrc}" alt="${favoriteIconAlt}">
            </a>
          </div>
          <div class="right">
            <a class="edit-btn mr">
              <img src="public/images/edit-inactive-details.png" alt="Edit Icon">
            </a>
            <a class="remove-btn">
              <img src="public/images/remove-inactive-details.png" alt="Remove Icon">
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderDetailsPage(recipe, ingredientsData) {
  const rootElement = document.getElementById('root');
  const recipeDetailsHtml = renderRecipeDetails(recipe);
  const detailsDiv = document.createElement('div');
  detailsDiv.innerHTML = recipeDetailsHtml;
  rootElement.appendChild(detailsDiv);

  const ingredientsList = document.querySelector('.ingredients-lists');

  if (ingredientsData && ingredientsData.ingredients) {
    ingredientsData.ingredients.forEach((ingredient) => {
      const listItem = document.createElement('li');
      listItem.className = 'ingredient-list';
      listItem.textContent = `${ingredient.amount} ${ingredient.amountType} ${ingredient.ingredientId}`;
      ingredientsList.appendChild(listItem);
    });
  }

  document.querySelector('.close-btn').addEventListener('click', () => {
    const detailsPanel = document.querySelector('.recipe-details-overlay');
    if (detailsPanel) {
      detailsPanel.remove();
    }
  });

  addToFavorite();
  removeRecipeBtnHandler();
  editRecipeBtnHandler(recipe);
}
