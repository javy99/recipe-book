/* eslint-disable */
import { removeIngredientInRecipeEdit } from './eventHandlers.js';

const addRecipeContent = `
  <div class="modal add-recipe-modal">
    <div class="modal-content">
        <a class="close-modal-btn">
          <img src="public/images/close-icon-grey.png" class="modal-close-btn" alt="Close Button">
        </a>
        <h2 class="secondary-title">Adding New Recipe</h2>
        <form>
            <div class="basic-info">
              <div class="input-group form-left">
                <label for="recipe-name" class="form-label">Name of recipe</label>
                <input type="text" id="recipe-name" placeholder="Name" class="form-input input-80">
              </div>
              <div class="input-group form-right">
                <label for="cooking-time" class="form-label">Cooking time</label>
                <div class="inline-wrapper">
                  <input type="number" placeholder="15" id="cooking-time" class="form-input md-input">
                  <span class="time">min</span>
                </div>
              </div>
            </div>
            <div class="description-area">
              <div class="input-group">
                <label for="description" class="form-label">Description</label>
                <textarea placeholder="Description" id="description" class="form-textarea"></textarea>
              </div>
            </div>
            <div class="ingredients">
                <div class="ingredients-row">
                  <div class="input-group form-left">
                    <label for="ingredient" class="form-label">Ingredients</label>
                    <input type="text" id="ingredient" placeholder="Ingredient" class="form-input input-80">
                  </div>
                  <div class="input-group form-right">
                    <label for="quantity" class="form-label">Quantity</label>
                    <div class="inline-wrapper">
                      <input type="text" placeholder="15" id="quantity" class="form-input sm-input">
                      <select aria-label="Select" name="measure" id="measure" class="form-select">
                        <option value="pc">pc</option>
                        <option value="kg">kg</option>
                        <option value="cup">cup</option>
                        <option value="ml">ml</option>
                      </select>
                    </div>
                  </div>
                </div>
            </div>
            <button type="button" class="add-ingredient-btn">+ Add ingredient</button> <br>
            <button type="submit" class="primary-btn add-new-recipe-btn">Add New Recipe</button>
        </form>
    </div>
  </div>
`;

export function renderAddRecipeModal() {
  const targetElement = document.getElementById('root');
  targetElement.insertAdjacentHTML('afterbegin', addRecipeContent);

  const closeAddRecipeBtn = document.querySelector('.close-modal-btn');
  closeAddRecipeBtn.addEventListener('click', () => {
    const addRecipeModal = document.querySelector('.add-recipe-modal');
    if (addRecipeModal) {
      addRecipeModal.remove();
    }
  });

  const addIngredientBtn = document.querySelector('.add-ingredient-btn');
  const ingredientsContainer = document.querySelector('.ingredients');

  addIngredientBtn.addEventListener('click', () => {
    const newIngredientRow = document.createElement('div');
    newIngredientRow.classList.add('ingredients-row');

    newIngredientRow.innerHTML = `
      <div class="input-group form-left">
        <input type="text" placeholder="Ingredient" class="form-input input-80">
      </div>
      <div class="input-group form-right">
        <div class="inline-wrapper">
          <input type="text" placeholder="15" class="form-input sm-input">
          <select aria-label="Select" name="measure" class="form-select">
            <option value="pc">pc</option>
            <option value="kg">kg</option>
            <option value="cup">cup</option>
            <option value="ml">ml</option>
          </select>
        </div>
      </div>
    `;
    ingredientsContainer.appendChild(newIngredientRow);
  });

  const addNewRecipeBtn = document.querySelector('.add-new-recipe-btn');
  addNewRecipeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const ingredientRows = document.querySelectorAll('.ingredients-row');
    const ingredients = [];
    const recipeName = document.getElementById('recipe-name').value;
    const cookingTime = document.getElementById('cooking-time').value;
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const measure = document.getElementById('measure').value;

    ingredientRows.forEach((row) => {
      const ingredientNameInput = row.querySelector('.form-input.input-80');
      const ingredientQuantityInput = row.querySelector('.form-input.sm-input');
      const ingredientMeasureSelect = row.querySelector('.form-select');
      const ingredientName = ingredientNameInput.value;
      const ingredientQuantity = ingredientQuantityInput.value;
      const ingredientMeasure = ingredientMeasureSelect.value;

      if (ingredientName && ingredientQuantity) {
        ingredients.push({
          ingredientId: ingredientName,
          amount: ingredientQuantity,
          amountType: ingredientMeasure,
        });
      }
    });

    if (!recipeName || !cookingTime || !description || !quantity || !measure || ingredients.length === 0) {
      alert('Please fill in all the required fields and add at least one ingredient.');
      return;
    }

    fetch('http://localhost:3000/recipes')
      .then((response) => response.json())
      .then((recipes) => {
        const maxId = recipes.reduce((max, recipe) => Math.max(max, recipe.id), 0);

        let recipe = {
          id: maxId + 1,
          name: document.getElementById('recipe-name').value,
          description: document.getElementById('description').value,
          cookingTime: document.getElementById('cooking-time').value,
          isFavorite: false,
          isPopular: false,
          ingredients: ingredients,
        };

        return fetch('http://localhost:3000/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipe),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

const confirmDeletionContent = `
  <div class="modal remove-confirm-modal">
    <div class="modal-confirm-content">
        <a class="close-modal-btn">
          <img src="public/images/close-icon-grey.png" class="modal-close-btn" alt="Close Button">
        </a>
        <h2 class="secondary-title">Confirmation</h2>
        <p class="confirm-paragraph">Are you sure you want to delete this recipe?</p>
        <div class="btn-group">
          <button type="submit" class="secondary-btn confirm-no-btn">Cancel</button>
          <button type="submit" class="primary-btn confirm-yes-btn">Yes, delete</button>
        </div>
    </div>
  </div>
`;

export function renderRemoveRecipeModal(recipeId) {
  if (document.querySelector('.remove-confirm-modal')) {
    return;
  }

  const targetElement = document.getElementById('root');
  targetElement.insertAdjacentHTML('afterbegin', confirmDeletionContent);

  const confirmYesBtn = document.querySelector('.confirm-yes-btn');
  const confirmNoBtn = document.querySelector('.confirm-no-btn');
  const closeConfirmModalBtn = document.querySelector('.close-modal-btn');

  confirmYesBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${recipeId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Recipe deleted successfully');
        location.reload();
      } else {
        console.error('Error deleting recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      const removeConfirmModal = document.querySelector('.remove-confirm-modal');
      if (removeConfirmModal) {
        removeConfirmModal.remove();
      }
    }
  });

  confirmNoBtn.addEventListener('click', () => {
    const removeConfirmModal = document.querySelector('.remove-confirm-modal');
    if (removeConfirmModal) {
      removeConfirmModal.remove();
    }
  });

  closeConfirmModalBtn.addEventListener('click', () => {
    const removeConfirmModal = document.querySelector('.remove-confirm-modal');

    if (removeConfirmModal) {
      removeConfirmModal.remove();
    }
  });
}

const editRecipeContent = `
  <div class="modal edit-recipe-modal">
    <div class="modal-content">
        <a class="close-modal-btn">
          <img src="public/images/close-icon-grey.png" class="modal-close-btn" alt="Close Button">
        </a>
        <h2 class="secondary-title">Editing your Recipe</h2>
        <form>
            <div class="basic-info">
              <div class="input-group form-left">
                <label for="recipe-name" class="form-label">Name of recipe</label>
                <input type="text" id="recipe-name" placeholder="Name" class="form-input input-80">
              </div>
              <div class="input-group form-right">
                <label for="cooking-time" class="form-label">Cooking time</label>
                <div class="inline-wrapper">
                  <input type="number" placeholder="15" id="cooking-time" class="form-input md-input">
                  <span class="time">min</span>
                </div>
              </div>
            </div>
            <div class="description-area">
              <div class="input-group">
                <label for="description" class="form-label">Description</label>
                <textarea placeholder="Description" id="description" class="form-textarea"></textarea>
              </div>
            </div>
            <div class="ingredients">
                <div class="ingredients-label-row">
                  <div class="input-group form-left edit-form">
                    <label for="ingredient" class="form-label">Ingredients</label>
                  </div>
                  <div class="input-group form-right edit-form">
                    <label for="quantity" class="form-label">Quantity</label>
                    <div class="inline-wrapper"></div>
                  </div>
                </div>
            </div>
            <button type="button" class="add-ingredient-btn">+ Add ingredient</button> <br>
            <button type="submit" class="primary-btn edit-recipe-btn">Edit Recipe</button>
        </form>
    </div>
  </div>
`;

export function renderEditRecipeModal(recipe, allRecipes) {
  if (document.querySelector('.edit-recipe-modal')) {
    return;
  }

  const targetElement = document.getElementById('root');
  targetElement.insertAdjacentHTML('afterbegin', editRecipeContent);
  const closeEditRecipeBtn = document.querySelector('.close-modal-btn');
  closeEditRecipeBtn.addEventListener('click', () => {
    const editRecipeModal = document.querySelector('.edit-recipe-modal');
    if (editRecipeModal) {
      editRecipeModal.remove();
    }
  });

  const recipeNameInput = document.getElementById('recipe-name');
  const cookingTimeInput = document.getElementById('cooking-time');
  const descriptionTextarea = document.getElementById('description');
  const ingredientsContainer = document.querySelector('.ingredients');

  recipeNameInput.value = recipe.name;
  cookingTimeInput.value = recipe.cookingTime;
  descriptionTextarea.value = recipe.description;

  recipe.ingredients.forEach((ingredient) => {
    const newIngredientRow = document.createElement('div');
    newIngredientRow.classList.add('ingredients-row');
    newIngredientRow.innerHTML = `
      <div class="input-group form-left">
        <input type="text" value="${ingredient.ingredientId}" class="form-input input-80">
      </div>
      <div class="input-group form-right">
        <div class="inline-wrapper">
          <input type="text" value="${ingredient.amount}" class="form-input sm-input">
          <select aria-label="Select" name="measure" class="form-select">
            <option value="pc">pc</option>
            <option value="kg">kg</option>
            <option value="cup">cup</option>
            <option value="ml">ml</option>
          </select>
          <a class="remove-btn-in-edit">
            <img src="public/images/remove-inactive-details.png" alt="Remove Icon">
          </a>
        </div>
      </div>
    `;
    ingredientsContainer.appendChild(newIngredientRow);
  });

  const addIngredientBtn = document.querySelector('.add-ingredient-btn');

  addIngredientBtn.addEventListener('click', () => {
    const newIngredientRow = document.createElement('div');
    newIngredientRow.classList.add('ingredients-row');

    newIngredientRow.innerHTML = `
      <div class="input-group form-left">
        <input type="text" placeholder="Ingredient" class="form-input input-80">
      </div>
      <div class="input-group form-right">
        <div class="inline-wrapper">
          <input type="text" placeholder="15" class="form-input sm-input">
          <select aria-label="Select" name="measure" class="form-select">
            <option value="pc">pc</option>
            <option value="kg">kg</option>
            <option value="cup">cup</option>
            <option value="ml">ml</option>
          </select>
          <a class="remove-btn-in-edit">
          <img src="public/images/remove-inactive-details.png" alt="Remove Icon">
        </a>
        </div>
      </div>
    `;

    ingredientsContainer.appendChild(newIngredientRow);
  });

  const editRecipeBtn = document.querySelector('.edit-recipe-btn');
  editRecipeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const updatedRecipe = {
      id: recipe.id,
      name: recipeNameInput.value,
      cookingTime: cookingTimeInput.value,
      description: descriptionTextarea.value,
      ingredients: collectIngredients(ingredientsContainer),
    };

    updateRecipeInDatabase(updatedRecipe, allRecipes);

    const editRecipeModal = document.querySelector('.edit-recipe-modal');
    if (editRecipeModal) {
      editRecipeModal.remove();
    }
  });
  removeIngredientInRecipeEdit()
}

function collectIngredients(container) {
  const ingredientRows = container.querySelectorAll('.ingredients-row');
  const ingredients = [];

  ingredientRows.forEach((row) => {
    const ingredientNameInput = row.querySelector('.form-input.input-80');
    const ingredientQuantityInput = row.querySelector('.form-input.sm-input');
    const ingredientMeasureSelect = row.querySelector('.form-select');
    const ingredientName = ingredientNameInput.value;
    const ingredientQuantity = ingredientQuantityInput.value;
    const ingredientMeasure = ingredientMeasureSelect.value;

    if (ingredientName && ingredientQuantity) {
      ingredients.push({
        ingredientId: ingredientName,
        amount: ingredientQuantity,
        amountType: ingredientMeasure,
      });
    }
  });

  return ingredients;
}

async function updateRecipeInDatabase(updatedRecipe, allRecipes) {
  try {
    const response = await fetch(`http://localhost:3000/recipes/${updatedRecipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    });
    if (response.status === 200) {
      console.log('Recipe updated successfully');
      const index = allRecipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
      if (index !== -1) {
        allRecipes[index] = updatedRecipe;
      }
    } else {
      console.error('Error updating recipe');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
