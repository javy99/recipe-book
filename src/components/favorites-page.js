/* eslint-disable */
import { renderSideBar } from './sidebar.js';
import { renderRecipes } from './card.js';
import { attachRecipeClickHandlers } from '../utils/eventHandlers.js';

const favoritesPageContent = `
  <div class="container">
    <div id="main-content">
      <div class="wrapper-top">
        <h1 class="main-title">Favorite Recipes</h1>
      </div>
      <div class="row row-3"></div>
      <div class="row row-4"></div>
    </div>
  </div>
`;

export function renderFavoritesPage() {
  const targetElement = document.getElementById('root');
  targetElement.innerHTML = favoritesPageContent;

  renderSideBar('favorites-page-link');

  fetch('../../db.json')
    .then((response) => response.json())
    .then((data) => {
      renderRecipes(data.recipes, '.row-3', (recipe) => recipe.isFavorite);

      attachRecipeClickHandlers(data.recipes);
    })
    .catch((error) => {
      console.error('There was an error fetching the JSON data:', error);
    });
}

export function toggleFavorite(recipeId) {
  fetch(`http://localhost:3000/recipes/${recipeId}`)
    .then((response) => response.json())
    .then((recipe) => {
      recipe.isFavorite = !recipe.isFavorite;

      return fetch(`http://localhost:3000/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });
    })
    .then((response) => response.json())
    .then((updatedRecipe) => {
      const favoriteButton = document.querySelector(`.card[data-id="${recipeId}"] .add-to-favorites`);
      const favoriteIcon = favoriteButton.querySelector('img');

      if (updatedRecipe.isFavorite) {
        favoriteButton.setAttribute('data-favorite', true);
        favoriteIcon.src = 'public/images/fav-active.png';
        favoriteIcon.alt = 'Favorite Icon Active';
      } else {
        favoriteButton.setAttribute('data-favorite', false);
        favoriteIcon.src = 'public/images/fav-inactive.png';
        favoriteIcon.alt = 'Favorite Icon Inactive';
      }
    })
    .catch((error) => {
      console.error('Error toggling favorite status:', error);
    });
}
