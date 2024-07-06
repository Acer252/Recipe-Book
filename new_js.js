document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const recipeList = document.getElementById('recipeList');
    const recipeModal = $('#recipeModal');
    const recipeNameInput = document.getElementById('recipeNameInput');
    const recipeImageInput = document.getElementById('recipeImageInput');
    const recipeIngredientsInput = document.getElementById('recipeIngredientsInput');
    const recipeLinkInput = document.getElementById('recipeLinkInput');
    const saveButton = document.getElementById('saveButton');
    const modalTitle = document.getElementById('modalTitle');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let currentEditIndex = null;
    let isEditMode = false;

    function saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    addButton.addEventListener('click', () => {
        isEditMode = false;
        recipeNameInput.value = '';
        recipeImageInput.value = '';
        recipeIngredientsInput.value = '';
        recipeLinkInput.value = '';
        modalTitle.textContent = 'Add Recipe';
        recipeModal.modal('show');
    });

    recipeList.addEventListener('click', (event) => {
        if (event.target.classList.contains('editButton')) {
            isEditMode = true;
            currentEditIndex = event.target.dataset.index;
            const recipe = recipes[currentEditIndex];
            recipeNameInput.value = recipe.name;
            recipeImageInput.value = recipe.image;
            recipeIngredientsInput.value = recipe.ingredients.join(', ');
            recipeLinkInput.value = recipe.link;
            modalTitle.textContent = 'Edit Recipe';
            recipeModal.modal('show');
        }
    });

    saveButton.addEventListener('click', () => {
        const recipeName = recipeNameInput.value;
        const recipeImage = recipeImageInput.value;
        const recipeIngredients = recipeIngredientsInput.value.split(',').map(ingredient => ingredient.trim());
        const recipeLink = recipeLinkInput.value;
        if (recipeName && recipeImage && recipeIngredients.length > 0 && recipeLink) {
            const recipe = {
                name: recipeName,
                image: recipeImage,
                ingredients: recipeIngredients,
                link: recipeLink
            };
            if (isEditMode) {
                recipes[currentEditIndex] = recipe;
            } else {
                recipes.push(recipe);
            }
            saveRecipes();
            renderRecipes();
            recipeModal.modal('hide');
        }
    });

    function renderRecipes() {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'col-md-4';
            recipeDiv.innerHTML = `
                <div class="recipe card">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text">Ingredients: ${recipe.ingredients.join(', ')}</p>
                        <a href="${recipe.link}" target="_blank" class="btn btn-info viewButton" data-index="${index}">View</a>
                        <button class="btn btn-primary editButton" data-index="${index}">Edit</button>
                    </div>
                </div>
            `;
            recipeList.appendChild(recipeDiv);
        });
    }

    renderRecipes();
});
