const getMealBtn = document.getElementById('get_meal');
const mealContainer = document.getElementById('meal');
const findBtn = document.getElementById('find');
const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search_input');
const searchSection = document.getElementById('search_section');

getMealBtn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        });
});

const createMeal = (meal) => {
    const ingredients = [];
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            // Stop if no more ingredients
            break;
        }
    }

    const newInnerHTML = `
        <div class="row">
            <div class="columns five">
                <img src="${meal.strMealThumb}" alt="Meal Image">
                ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                <h5>Ingredients:</h5>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div class="columns seven">
                <h4>${meal.strMeal}</h4>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
        ${meal.strYoutube ? `
        <div class="row">
            <h5>Video Recipe</h5>
            <div class="videoWrapper">
                <iframe width="420" height="315"
                src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                </iframe>
            </div>
        </div>` : ''}
    `;

    mealContainer.innerHTML = newInnerHTML;
};

findBtn.addEventListener('click', () => {
    toggleSection(searchSection);
});

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals) {
                    mealContainer.innerHTML = '';
                    data.meals.forEach(meal => createMeal(meal));
                } else {
                    mealContainer.innerHTML = '<p>No meals found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
            });
    } else {
        mealContainer.innerHTML = '<p>Please enter a search term.</p>';
    }
});


function toggleSection(section) {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

const floatingBtn = document.querySelector('.floating-btn');
const closeBtn = document.querySelector('.close-btn');
const socialPanelContainer = document.querySelector('.social-panel-container');

floatingBtn.addEventListener('click', () => {
    socialPanelContainer.classList.toggle('visible');
});

closeBtn.addEventListener('click', () => {
    socialPanelContainer.classList.remove('visible');
});
