/* eslint-disable */

import { attachRecipeClickHandlers } from '../utils/eventHandlers.js';
import { renderRecipes } from './card.js';
import { renderSideBar } from './sidebar.js';
import { addRecipeBtnClickHandler } from '../utils/eventHandlers.js';

const mainPageContent = `
  <div class="container">
    <div id="main-content">
      <div class="wrapper-top">
        <h1 class="main-title">Recipes</h1>
        <button class="primary-btn add-recipe-btn">+ Add new recipe</button>
      </div>
      <h2 class="secondary-title">Recipe of the day</h2>
      <div class="row row-1"></div>
      <h2 class="secondary-title mt">Explore recipes</h2>
      <div class="row row-2"></div>
    </div>
  </div>
`;

export function renderMainPage() {
  const targetElement = document.getElementById('root');
  targetElement.innerHTML = mainPageContent;

  renderSideBar('main-page-link');

  fetch('../../db.json')
    .then((response) => response.json())
    .then((data) => {
      renderRecipes(data.recipes, '.row-1', (recipe) => recipe.isPopular);
      renderRecipes(data.recipes, '.row-2');

      attachRecipeClickHandlers(data.recipes);

      addRecipeBtnClickHandler();
    })
    .catch((error) => {
      console.error('There was an error fetching the JSON data:', error);
    });
}

window.onload = () => {
  renderMainPage();
};
