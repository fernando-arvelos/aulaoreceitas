import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkCategories, getDrinkRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';

function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.recipesReducer.drinks);
  const categories = useSelector((state) => state.recipesReducer.drinkCategories);

  useEffect(() => {
    dispatch(getDrinkRecipes());
    dispatch(getDrinkCategories());
  }, []);

  return (
    <div>
      {
        categories.map((category) => {
          const { strCategory } = category;

          return (
            <div key={ strCategory } data-testid={ `${strCategory}-category-filter` }>
              <h2>{ strCategory }</h2>
            </div>
          );
        })
      }
      {
        drinks.map((drink, index) => {
          const { strDrinkThumb, strDrink } = drink;
          return (
            <RecipeCard
              key={ `${strDrink}-${index}` }
              recipeImage={ strDrinkThumb }
              recipeName={ strDrink }
              index={ index }
            />
          );
        })
      }
    </div>
  );
}

export default Drinks;
