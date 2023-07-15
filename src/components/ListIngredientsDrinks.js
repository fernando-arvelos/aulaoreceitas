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
  const drinksFiltred = drinks.filter((meal) => meal.idDrink === recipeId);

  return (
    <div>
      {
        drinksFiltred.map((drink) => (
          <div key={ drink.idDrink }>
            <ul>
              <li data-testid="0-ingredient-name-and-measure">
                { drink.strIngredient1 }
                { drink.strMeasure1 }
              </li>
              <li data-testid="1-ingredient-name-and-measure">
                { drink.strIngredient2 }
                { drink.strMeasure2 }
              </li>
              <li data-testid="2-ingredient-name-and-measure">
                { drink.strIngredient3 }
                { drink.strMeasure3 }
              </li>
              <li data-testid="3-ingredient-name-and-measure">
                { drink.strIngredient4 }
                { drink.strMeasure4 }
              </li>
              <li data-testid="4-ingredient-name-and-measure">
                { drink.strIngredient5 }
                { drink.strMeasure5 }
              </li>
              <li data-testid="5-ingredient-name-and-measure">
                { drink.strIngredient6 }
                { drink.strMeasure6 }
              </li>
              <li data-testid="6-ingredient-name-and-measure">
                { drink.strIngredient7 }
                { drink.strMeasure7 }
              </li>
              <li data-testid="7-ingredient-name-and-measure">
                { drink.strIngredient8 }
                { drink.strMeasure8 }
              </li>
              <li data-testid="8-ingredient-name-and-measure">
                { drink.strIngredient9 }
                { drink.strMeasure9 }
              </li>
              <li data-testid="9-ingredient-name-and-measure">
                { drink.strIngredient10 }
                { drink.strMeasure10 }
              </li>
              <li data-testid="10-ingredient-name-and-measure">
                { drink.strIngredient11 }
                { drink.strMeasure11 }
              </li>
              <li data-testid="11-ingredient-name-and-measure">
                { drink.strIngredient12 }
                { drink.strMeasure12 }
              </li>
              <li data-testid="12-ingredient-name-and-measure">
                { drink.strIngredient13 }
                { drink.strMeasure13 }
              </li>
              <li data-testid="13-ingredient-name-and-measure">
                { drink.strIngredient14 }
                { drink.strMeasure14 }
              </li>
              <li data-testid="14-ingredient-name-and-measure">
                { drink.strIngredient15 }
                { drink.strMeasure15 }
              </li>
              <li data-testid="15-ingredient-name-and-measure">
                { drink.strIngredient16 }
                { drink.strMeasure16 }
              </li>
              <li data-testid="16-ingredient-name-and-measure">
                { drink.strIngredient17 }
                { drink.strMeasure17 }
              </li>
              <li data-testid="17-ingredient-name-and-measure">
                { drink.strIngredient18 }
                { drink.strMeasure18 }
              </li>
              <li data-testid="18-ingredient-name-and-measure">
                { drink.strIngredient19 }
                { drink.strMeasure19 }
              </li>
              <li data-testid="19-ingredient-name-and-measure">
                { drink.strIngredient20 }
                { drink.strMeasure20 }
              </li>
            </ul>

          </div>
        ))
      }

    </div>
  );
}

export default ListIngredientsDrinks;
