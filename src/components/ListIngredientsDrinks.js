import React from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mockDrinks from './mockDrinks';

function ListIngredientsDrinks() {
  // const drinks = useSelector((state) => state.recipesReducer.drinks);
  const drinks = mockDrinks;

  const history = useHistory();
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const drinksFiltered = drinks.filter((meal) => meal.idDrink === recipeId);

  const getIngredients = () => {
    const numberLimit = 25;
    const listOfIngredients = [];
    for (let index = 1; index <= numberLimit; index += 1) {
      const ingredient = drinksFiltered[0][`strIngredient${index}`];
      const measure = drinksFiltered[0][`strMeasure${index}`];
      if (ingredient) {
        listOfIngredients.push(`${ingredient} - ${measure}`);
      }
    }
    return listOfIngredients;
  };

  const ingredients = getIngredients();
  console.log(ingredients);

  return (
    <div>
      <div className="checkbox-container">
        {ingredients.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              id={ ingredient }
              key={ index }
            />
            <p>
              {ingredient}
            </p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ListIngredientsDrinks;
