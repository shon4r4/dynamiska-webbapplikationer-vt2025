// Search meals by name.
// Returns { meals: [...] } or { meals: null } if nothing or error.
export function searchMeal(searchTerm) {
  const term = (searchTerm || '').trim();
  if (!term) return Promise.resolve({ meals: null });

  // NOTE: no URL encoding here — special chars/spaces may break the URL.
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term;

  return fetch(url)
    .then(res => res.json())
    .catch(() => ({ meals: null })); // simple fallback on error
}

// Get one random meal.
// Returns a single meal object or null on error.
export function getRandomMeal() {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

  return fetch(url)
    .then(res => res.json())
    .then(data => (data && data.meals ? data.meals[0] : null))
    .catch(() => null); // simple fallback on error
}
