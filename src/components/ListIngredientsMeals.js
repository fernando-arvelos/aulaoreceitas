import React from 'react';
import { useHistory } from 'react-router-dom';
import mealsMock from './mock';
// import { useSelector } from 'react-redux';

function ListIngredientsMeals() {
  // const meals = useSelector((state) => state.recipesReducer.meals);
  const meals = mealsMock;

  const history = useHistory();
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const mealsFiltered = meals.filter((meal) => meal.idMeal === recipeId);

  const getIngredients = () => {
    const numberLimit = 25;
    const listOfIngredients = [];
    for (let index = 1; index <= numberLimit; index += 1) {
      const ingredient = mealsFiltered[0][`strIngredient${index}`];
      const measure = mealsFiltered[0][`strMeasure${index}`];
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

export default ListIngredientsMeals;
