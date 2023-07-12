import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealCategories, getMealRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';

function Meals() {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipesReducer.meals);
  const categories = useSelector((state) => state.recipesReducer.mealCategories);

  useEffect(() => {
    dispatch(getMealRecipes());
    dispatch(getMealCategories());
  }, []);

  return (
    <div>
      {
        categories.map((category) => {
          const { strCategory } = category;

          return (
            <div key={ strCategory } data-testid={ `${strCategory}-category-filter` }>
              <h2>{ strCategory }</h2>
            </div>
          );
        })
      }
      {
        meals.map((meal, index) => {
          const { strMealThumb, strMeal } = meal;
          return (
            <RecipeCard
              key={ `${strMeal}-${index}` }
              recipeImage={ strMealThumb }
              recipeName={ strMeal }
              index={ index }
              data-testid={ `${index}-recipe-card` }
            />
          );
        })
      }
    </div>
  );
}

export default Meals;
