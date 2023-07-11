import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesMeals } from '../redux/actions';
import RecipeCard from './RecipeCard';

function Meals() {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipesReducer.meals);

  useEffect(() => {
    dispatch(getRecipesMeals());
  }, []);

  return (
    <div>
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
