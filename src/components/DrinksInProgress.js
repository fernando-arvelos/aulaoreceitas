// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mockDrinks from '../mocks/mockDrinks';
import ListIngredientsDrinks from './ListIngredientsDrinks';

function MealsInProgress() {
  // const drinks = useSelector((state) => state.recipesReducer.drinks);
  const drinks = mockDrinks;

  const history = useHistory();
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const drinksFiltred = drinks.filter((meal) => meal.idDrink === recipeId);

  // console.log(mealsFiltred);
  return (
    <main>
      <div>
        {
          drinksFiltred.map((drink) => (
            <div key={ drink.idDrink }>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid="recipe-photo"
                className="w-52"
              />

              <h1 data-testid="recipe-title">{ drink.strDrink }</h1>

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

              <h3 data-testid="recipe-category">{ drink.strCategory }</h3>
              <h3 data-testid="recipe-category">{ drink.strAlcoholic }</h3>

              <h2>Ingredients</h2>
              <ListIngredientsDrinks />

              <h2>instructions</h2>
              <p data-testid="instructions">{ drink.strInstructions }</p>

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
