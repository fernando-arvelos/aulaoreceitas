import {
  FETCH_DRINK_DETAILS_SUCCESS,
  FETCH_FAILURE,
  FETCH_MEAL_DETAILS_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  recipeDetails: [],
};

const recipeDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  case FETCH_MEAL_DETAILS_SUCCESS:
  case FETCH_DRINK_DETAILS_SUCCESS:
    return {
      ...state,
      recipeDetails: action.payload,
    };
  default:
    return state;
  }
};

export default recipeDetailsReducer;
