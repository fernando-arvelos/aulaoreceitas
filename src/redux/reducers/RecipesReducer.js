import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_DRINKS_SUCCESS,
  FETCH_DRINK_CATEGORIES_SUCCESS,
  FETCH_MEALS_SUCCESS,
  FETCH_MEAL_CATEGORIES_SUCCESS,
  FETCH_RECIPES_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  errorRecipes: '',
  mealCategories: [],
  drinkCategories: [],
  errorCategories: '',
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_MEALS_SUCCESS:
    return {
      ...state,
      meals: action.payload,
    };
  case FETCH_DRINKS_SUCCESS:
    return {
      ...state,
      drinks: action.payload,
    };
  case FETCH_RECIPES_FAILURE:
    return {
      ...state,
      errorRecipes: action.payload,
    };
  case FETCH_MEAL_CATEGORIES_SUCCESS:
    return {
      ...state,
      mealCategories: action.payload,
    };
  case FETCH_DRINK_CATEGORIES_SUCCESS:
    return {
      ...state,
      drinkCategories: action.payload,
    };
  case FETCH_CATEGORIES_FAILURE:
    return {
      ...state,
      errorCategories: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
