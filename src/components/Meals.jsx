import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealCategories, getMealRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';
import Filters from './Filters';

function Meals() {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipesReducer.meals);
  const filteredMeals = useSelector((state) => state.recipesReducer.filteredMeals);
  const filterStatus = useSelector((state) => state.recipesReducer.filterStatus);

  useEffect(() => {
    dispatch(getMealRecipes());
    dispatch(getMealCategories());
  }, [dispatch]);

  return (
    <div>
      <Filters />
      <div>
        {
          filterStatus
            ? (
              filteredMeals.map((meal, index) => {
                const { strMealThumb, strMeal, idMeal } = meal;
                return (
                  <RecipeCard
                    key={ `${strMeal}-${index}` }
                    recipeImage={ strMealThumb }
                    recipeName={ strMeal }
                    index={ index }
                    recipeId={ idMeal }
                  />
                );
              })
            ) : (
              meals.map((meal, index) => {
                const { strMealThumb, strMeal, idMeal } = meal;
                return (
                  <RecipeCard
                    key={ `${strMeal}-${index}` }
                    recipeImage={ strMealThumb }
                    recipeName={ strMeal }
                    index={ index }
                    recipeId={ idMeal }
                  />
                );
              })
            )
        }
      </div>
    </div>
  );
}

export default Meals;
