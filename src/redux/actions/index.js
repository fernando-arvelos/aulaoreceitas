import { fetchDrinks, fetchDrinkCategories } from '../../helpers/drinksAPI';
import { fetchMeals, fetchMealCategories } from '../../helpers/mealsAPI';

// ACTIONS TYPES
export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';
export const FETCH_DRINKS_SUCCESS = 'FETCH_DRINKS_SUCCESS';
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';
export const FETCH_MEAL_CATEGORIES_SUCCESS = 'FETCH_MEAL_CATEGORIES_SUCCESS';
export const FETCH_DRINK_CATEGORIES_SUCCESS = 'FETCH_DRINK_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

// ACTIONS CREATORS
export const fetchRecipesFailed = (error) => ({
  type: FETCH_RECIPES_FAILURE,
  payload: error,
});

export const fetchMealsSuccessful = (meals) => ({
  type: FETCH_MEALS_SUCCESS,
  payload: meals,
});

export const fetchDrinksSuccessful = (drinks) => ({
  type: FETCH_DRINKS_SUCCESS,
  payload: drinks,
});

export const getMealRecipes = () => async (dispatch) => {
  try {
    const meals = await fetchMeals();
    const incomeLimit = 12;
    const filteredMeals = meals.slice(0, incomeLimit);
    dispatch(fetchMealsSuccessful(filteredMeals));
  } catch (error) {
    dispatch(fetchRecipesFailed(error));
  }
};

export const getDrinkRecipes = () => async (dispatch) => {
  try {
    const drinks = await fetchDrinks();
    const incomeLimit = 12;
    const filteredDrinks = drinks.slice(0, incomeLimit);
    dispatch(fetchDrinksSuccessful(filteredDrinks));
  } catch (error) {
    dispatch(fetchRecipesFailed(error.message));
  }
};

export const fetchCategoriesFailed = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchMealCategoriesSuccessful = (categories) => ({
  type: FETCH_MEAL_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchDrinkCategoriesSuccessful = (categories) => ({
  type: FETCH_DRINK_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getMealCategories = () => async (dispatch) => {
  try {
    const mealCategories = await fetchMealCategories();
    const categoryLimit = 5;
    const filteredCategories = mealCategories.slice(0, categoryLimit);
    dispatch(fetchMealCategoriesSuccessful(filteredCategories));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error.message));
  }
};

export const getDrinkCategories = () => async (dispatch) => {
  try {
    const drinkCategories = await fetchDrinkCategories();
    const categoryLimit = 5;
    const filteredCategories = drinkCategories.slice(0, categoryLimit);
    dispatch(fetchDrinkCategoriesSuccessful(filteredCategories));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error.message));
  }
};
