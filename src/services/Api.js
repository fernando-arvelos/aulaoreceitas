// meals
export const fetchMealsByIngredients = async (ingredients) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await response.json();
  return data.meals;
};

export const fetchMealsByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
};

export const fetchMealsByFirstLetter = async (FirstLetter) => {
  if (FirstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
    const data = await response.json();
    return data.meals;
  }
};

// drinks
export const fetchDrinksByIngredients = async (ingredients) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchDrinksByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchDrinksByFirstLetter = async (FirstLetter) => {
  if (FirstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
    const data = await response.json();
    return data.drinks;
  }
};
