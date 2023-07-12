import {
  FETCH_FAILURE,
  FETCH_DRINKS_SUCCESS,
  FETCH_DRINK_CATEGORIES_SUCCESS,
  FETCH_FILTERED_DRINKS_SUCCESS,
  FETCH_MEALS_SUCCESS,
  FETCH_MEAL_CATEGORIES_SUCCESS,
  FETCH_FILTERED_MEALS_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  mealCategories: [],
  drinkCategories: [],
  filteredMeals: [],
  filteredDrinks: [],
  error: '',
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
  case FETCH_FILTERED_MEALS_SUCCESS:
    return {
      ...state,
      filteredMeals: action.payload,
    };
  case FETCH_FILTERED_DRINKS_SUCCESS:
    return {
      ...state,
      filteredDrinks: action.payload,
    };
  case FETCH_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
