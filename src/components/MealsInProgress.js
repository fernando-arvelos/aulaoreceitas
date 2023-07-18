// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mealsMock from '../mocks/mock';
import ListIngredientsMeals from './ListIngredientsMeals';

function MealsInProgress() {
  // const meals = useSelector((state) => state.recipesReducer.meals);
  const meals = mealsMock;

  const history = useHistory();
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const mealsFiltred = meals.filter((meal) => meal.idMeal === recipeId);

  // console.log(mealsFiltred);
  return (
    <main>
      <div>
        {
          mealsFiltred.map((meal) => (
            <div key={ meal.idMeal }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid="recipe-photo"
                className="w-52"
              />

              <h1 data-testid="recipe-title">{ meal.strMeal }</h1>

              <button
                type="button"
                data-testid="share-btn"
              >
                Share
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
              >
                Favorite
              </button>

              <h3 data-testid="recipe-category">{ meal.strCategory }</h3>

              <h2>Ingredients</h2>
              <ListIngredientsMeals />

              <h2>instructions</h2>
              <p data-testid="instructions">{ meal.strInstructions }</p>

              <button
                type="button"
                data-testid="finish-recipe-btn"
              >
                Finalizar Receita
              </button>

            </div>
          ))
        }

      </div>
    </main>
  );
}

export default MealsInProgress;
