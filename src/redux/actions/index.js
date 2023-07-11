import getDrinks from '../../helpers/drinksAPI';
import getMeals from '../../helpers/mealsAPI';

// ACTIONS TYPES
export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_DRINKS_SUCCESS = 'FETCH_DRINKS_SUCCESS';

// ACTIONS CREATORS
export const fetchFailed = (error) => ({
  type: FETCH_FAILURE,
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

export const getRecipesMeals = () => async (dispatch) => {
  try {
    const meals = await getMeals();
    const incomeLimit = 12;
    const filteredMeals = meals.slice(0, incomeLimit);
    dispatch(fetchMealsSuccessful(filteredMeals));
  } catch (error) {
    dispatch(fetchFailed(error));
  }
};

export const getRecipesDrinks = () => async (dispatch) => {
  try {
    const drinks = await getDrinks();
    const incomeLimit = 12;
    const filteredDrinks = drinks.slice(0, incomeLimit);
    dispatch(fetchDrinksSuccessful(filteredDrinks));
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};
