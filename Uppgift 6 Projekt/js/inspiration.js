// inspiration.js — show multiple popular dishes with title + instructions per cell
import { getRandomMeal } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Get all image placeholders inside the table container
  const imgs = document.querySelectorAll('#table-container .dish-img');
  if (!imgs.length) return; // Nothing to do if there are no slots

  try {
    // Fetch as many unique random meals as we have image slots
    const meals = await fetchUniqueRandomMeals(imgs.length);

    // For each slot, render image + title + instructions
    meals.forEach((meal, i) => {
      const img = imgs[i];
      if (!img || !meal) return; // Safety check

      // Fill the image element (src, alt, lazy loading)
      if (meal.strMealThumb) img.src = meal.strMealThumb;
      img.alt = meal.strMeal || 'Dish';
      img.loading = 'lazy';

      // Find the parent <td> so we can append text elements under the image
      const cell = img.closest('td') || img.parentElement;

      // Create (or reuse) a title element under the image
      let titleEl = cell.querySelector('.meal-title');
      if (!titleEl) {
        titleEl = document.createElement('h3');
        titleEl.className = 'meal-title';
        cell.appendChild(titleEl);
      }
      titleEl.textContent = meal.strMeal || 'Untitled dish';

      // Create (or reuse) an instructions paragraph under the title
      let instrEl = cell.querySelector('.meal-instructions');
      if (!instrEl) {
        instrEl = document.createElement('p');
        instrEl.className = 'meal-instructions';
        cell.appendChild(instrEl);
      }
      instrEl.textContent = meal.strInstructions || 'No instructions available.';
    });
  } catch (err) {
    // If something fails (network, parsing), keep the gallery placeholders
    console.warn('Could not load random meals:', err);
  }
});

/**
 * Fetch `count` unique random meals (deduplicated by idMeal).
 * A safety cap (maxTries) prevents endless loops if duplicates keep appearing.
 */
async function fetchUniqueRandomMeals(count, maxTries = Math.max(20, count * 4)) {
  const seen = new Set(); // track meal IDs to avoid duplicates
  const out = [];
  let tries = 0;

  while (out.length < count && tries < maxTries) {
    tries++;
    const meal = await safeGetRandomMeal();
    if (!meal || !meal.idMeal) continue; // skip invalid responses
    if (seen.has(meal.idMeal)) continue;  // skip duplicates
    seen.add(meal.idMeal);
    out.push(meal);
  }
  return out;
}

/**
 * Call getRandomMeal(); return null instead of throwing on error.
 * Keeps the fetch loop simple and resilient.
 */
async function safeGetRandomMeal() {
  try { 
    return await getRandomMeal(); 
  } catch { 
    return null; 
  }
}
