import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealCategories, getMealRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';
import Filters from './Filters';
import '../styles/meals.css';
import mealIcon from '../images/mealIcon.svg';

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
    <main className="flex-col-center px-3">

      <div className="flex-col-center pt-8 mb-5">
        <img src={ mealIcon } alt="meal icon" />
        <h1 className="title-meals">MEALS</h1>
      </div>

      <div>
        <div className="flex-col-center mb-5">
          <div>
            <Filters />
          </div>
        </div>
        <div className="flex justify-center flex-wrap mb-14">
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
    </main>
  );
}

export default Meals;
