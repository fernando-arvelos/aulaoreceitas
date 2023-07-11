import { FETCH_DRINKS_SUCCESS, FETCH_FAILURE, FETCH_MEALS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
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
