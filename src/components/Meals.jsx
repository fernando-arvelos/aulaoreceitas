import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredMeals, getMealCategories, getMealRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';

function Meals() {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipesReducer.meals);
  const categories = useSelector((state) => state.recipesReducer.mealCategories);
  const [enableFilter, setEnableFilter] = useState(false);
  const filteredMeals = useSelector((state) => state.recipesReducer.filteredMeals);
  const [lastClickedButton, setLastClickedButton] = useState(null);

  useEffect(() => {
    dispatch(getMealRecipes());
    dispatch(getMealCategories());
  }, []);

  function toggleFilter() {
    setEnableFilter((prevState) => !prevState);
  }

  const handleCategoryFilter = (category) => {
    setLastClickedButton(category);

    if (category === 'All') {
      setEnableFilter(false);
    } else if (lastClickedButton === category) {
      toggleFilter();
    } else if (lastClickedButton !== category) {
      dispatch(getFilteredMeals(category));
      setEnableFilter(true);
    }
  };

  return (
    <div>
      <button
        onClick={ () => handleCategoryFilter('All') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        categories.map((category) => {
          const { strCategory } = category;

          return (
            <button
              key={ strCategory }
              onClick={ () => handleCategoryFilter(strCategory) }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          );
        })
      }
      <div>
        {
          enableFilter
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
