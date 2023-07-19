import { combineReducers } from 'redux';
import exampleReducer from './LoginReducer';
import recipesReducer from './RecipesReducer';

const rootReducer = combineReducers({
  exampleReducer,
  recipesReducer,
});

export default rootReducer;
