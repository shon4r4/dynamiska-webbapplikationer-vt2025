import { getRandomMeal } from './api.js';

// grab elements once
const titleEl = document.getElementById('meal-title');
const imgEl = document.getElementById('meal-img');
const instrEl = document.getElementById('meal-instructions');

// if elements are missing (e.g. wrong page), do nothing
if (titleEl && imgEl && instrEl) {
  // small loading text
  titleEl.textContent = 'Loading meal...';
  instrEl.textContent = 'Loading instructions...';

  // fetch one random meal and fill the page
  getRandomMeal()
    .then(meal => {
      if (!meal) return; // no data from API

      // title
      titleEl.textContent = meal.strMeal || 'Untitled meal';

      // image (src + alt)
      if (meal.strMealThumb) {
        imgEl.src = meal.strMealThumb;
      }
      imgEl.alt = meal.strMeal || 'Meal image';

      // instructions
      instrEl.textContent = meal.strInstructions || 'No instructions available.';
    })
    .catch(() => {
      // simple error message if something goes wrong
      titleEl.textContent = 'Could not load meal';
      instrEl.textContent = 'Please try again later.';
    });
}
