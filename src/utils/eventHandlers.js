/* eslint-disable */

import { renderDetailsPage } from '../components/recipe-details.js';
import { renderAddRecipeModal, renderRemoveRecipeModal, renderEditRecipeModal } from './modals.js';

export function attachRecipeClickHandlers(recipes) {
  const recipeElements = document.querySelectorAll('[data-id]');

  recipeElements.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const id = parseInt(event.currentTarget.getAttribute('data-id'));
      const clickedRecipe = recipes.find((recipe) => recipe.id === id);

      if (clickedRecipe) {
        const detailsContainer = document.getElementById('recipe-details');
        if (detailsContainer) {
          detailsContainer.innerHTML = '';
        }
        renderDetailsPage(clickedRecipe, clickedRecipe);
      }
    });
  });
}

export function addRecipeBtnClickHandler() {
  const addRecipeBtn = document.querySelector('.add-recipe-btn');
  addRecipeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    renderAddRecipeModal();
  });
}

export function removeRecipeBtnHandler() {
  const removeRecipeBtns = document.querySelectorAll('.remove-btn');

  removeRecipeBtns.forEach((removeRecipeBtn) => {
    removeRecipeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = e.currentTarget.closest('[data-id]');
      if (card) {
        const id = parseInt(card.getAttribute('data-id'));
        renderRemoveRecipeModal(id);
      }
    });
  });
}

export function editRecipeBtnHandler(recipeOrRecipes) {
  const editRecipeBtns = document.querySelectorAll('.edit-btn');

  editRecipeBtns.forEach((editRecipeBtn) => {
    editRecipeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = e.currentTarget.closest('[data-id]');
      if (card) {
        const id = parseInt(card.getAttribute('data-id'));
        const recipesArray = Array.isArray(recipeOrRecipes) ? recipeOrRecipes : [recipeOrRecipes];
        const clickedRecipe = recipesArray.find((recipe) => recipe.id === id);
        if (clickedRecipe) {
          renderEditRecipeModal(clickedRecipe, recipeOrRecipes);
        }
      }
    });
  });
}

export function removeIngredientInRecipeEdit() {
  const removeIngredientBtns = document.querySelectorAll('.remove-btn-in-edit');

  removeIngredientBtns.forEach((removeIngredientBtn) => {
    removeIngredientBtn.addEventListener('click', function () {
      console.log('clicked');
      const ingredientListItem = this.closest('.ingredients-row');
      if (ingredientListItem) {
        ingredientListItem.remove();
      }
    });
  })

}
