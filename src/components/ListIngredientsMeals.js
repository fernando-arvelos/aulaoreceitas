import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import mealsMock from '../mocks/mock';
// import { useSelector } from 'react-redux';

function ListIngredientsMeals() {
  // const meals = useSelector((state) => state.recipesReducer.meals);
  const meals = mealsMock;
  const [checkedIngredients, setCheckedIngredients] = useState([]);

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

  useEffect(() => {
    const savedIngredients = localStorage.getItem('checkedIngredients');
    if (savedIngredients) {
      setCheckedIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  const saveInLocalStorage = (event) => {
    const { name, checked } = event.target;
    const updatedIngredients = checked
      ? [...checkedIngredients, name]
      : checkedIngredients.filter((ingredient) => ingredient !== name);

    setCheckedIngredients(updatedIngredients);
    localStorage.setItem('checkedIngredients', JSON.stringify(updatedIngredients));
  };

  const crossOutText = (event) => {
    const label = event.target.parentNode;

    if (event.target.checked) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
    saveInLocalStorage(event);
  };

  const isChecked = (ingredient) => checkedIngredients.includes(ingredient);

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
              onChange={ (event) => crossOutText(event) }
              checked={ isChecked(ingredient) }
            />
            <span
              style={ {
                textDecoration: isChecked(ingredient)
                  ? 'line-through'
                  : 'none',
              } }
            >
              {ingredient}
            </span>

          </label>
        ))}
      </div>
    </div>
  );
}

export default ListIngredientsMeals;
