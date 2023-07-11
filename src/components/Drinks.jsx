import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesDrinks } from '../redux/actions';
import RecipeCard from './RecipeCard';

function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.recipesReducer.drinks);

  useEffect(() => {
    dispatch(getRecipesDrinks());
  }, []);

  return (
    <div>
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
