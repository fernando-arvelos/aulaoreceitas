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
  const mealsFiltred = meals.filter((meal) => meal.idMeal === recipeId);

  return (
    <div>
      {
        mealsFiltred.map((meal) => (
          <div key={ meal.idMeal }>
            <ul>
              <li data-testid="0-ingredient-name-and-measure">
                { meal.strIngredient1 }
                { meal.strMeasure1 }
              </li>
              <li data-testid="1-ingredient-name-and-measure">
                { meal.strIngredient2 }
                { meal.strMeasure2 }
              </li>
              <li data-testid="2-ingredient-name-and-measure">
                { meal.strIngredient3 }
                { meal.strMeasure3 }
              </li>
              <li data-testid="3-ingredient-name-and-measure">
                { meal.strIngredient4 }
                { meal.strMeasure4 }
              </li>
              <li data-testid="4-ingredient-name-and-measure">
                { meal.strIngredient5 }
                { meal.strMeasure5 }
              </li>
              <li data-testid="5-ingredient-name-and-measure">
                { meal.strIngredient6 }
                { meal.strMeasure6 }
              </li>
              <li data-testid="6-ingredient-name-and-measure">
                { meal.strIngredient7 }
                { meal.strMeasure7 }
              </li>
              <li data-testid="7-ingredient-name-and-measure">
                { meal.strIngredient8 }
                { meal.strMeasure8 }
              </li>
              <li data-testid="8-ingredient-name-and-measure">
                { meal.strIngredient9 }
                { meal.strMeasure9 }
              </li>
              <li data-testid="9-ingredient-name-and-measure">
                { meal.strIngredient10 }
                { meal.strMeasure10 }
              </li>
              <li data-testid="10-ingredient-name-and-measure">
                { meal.strIngredient11 }
                { meal.strMeasure11 }
              </li>
              <li data-testid="11-ingredient-name-and-measure">
                { meal.strIngredient12 }
                { meal.strMeasure12 }
              </li>
              <li data-testid="12-ingredient-name-and-measure">
                { meal.strIngredient13 }
                { meal.strMeasure13 }
              </li>
              <li data-testid="13-ingredient-name-and-measure">
                { meal.strIngredient14 }
                { meal.strMeasure14 }
              </li>
              <li data-testid="14-ingredient-name-and-measure">
                { meal.strIngredient15 }
                { meal.strMeasure15 }
              </li>
              <li data-testid="15-ingredient-name-and-measure">
                { meal.strIngredient16 }
                { meal.strMeasure16 }
              </li>
              <li data-testid="16-ingredient-name-and-measure">
                { meal.strIngredient17 }
                { meal.strMeasure17 }
              </li>
              <li data-testid="17-ingredient-name-and-measure">
                { meal.strIngredient18 }
                { meal.strMeasure18 }
              </li>
              <li data-testid="18-ingredient-name-and-measure">
                { meal.strIngredient19 }
                { meal.strMeasure19 }
              </li>
              <li data-testid="19-ingredient-name-and-measure">
                { meal.strIngredient20 }
                { meal.strMeasure20 }
              </li>
            </ul>

          </div>
        ))
      }

    </div>
  );
}

export default ListIngredientsMeals;
