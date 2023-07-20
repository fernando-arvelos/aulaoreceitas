import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkCategories, getDrinkRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';
import Filters from './Filters';
import Header from './Header';

function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.recipesReducer.drinks);
  const filteredDrinks = useSelector((state) => state.recipesReducer.filteredDrinks);
  const filterStatus = useSelector((state) => state.recipesReducer.filterStatus);

  useEffect(() => {
    dispatch(getDrinkRecipes());
    dispatch(getDrinkCategories());
  }, [dispatch]);

  return (
    <div>
      <Header pageTitle="Drinks" />
      <div>
        <Filters />
      </div>
      <div>
        {
          filterStatus
            ? (
              filteredDrinks.map((drink, index) => {
                const { strDrinkThumb, strDrink, idDrink } = drink;
                return (
                  <RecipeCard
                    key={ `${strDrink}-${index}` }
                    recipeImage={ strDrinkThumb }
                    recipeName={ strDrink }
                    index={ index }
                    recipeId={ idDrink }
                  />
                );
              })
            ) : (
              drinks.map((drink, index) => {
                const { strDrinkThumb, strDrink, idDrink } = drink;
                return (
                  <RecipeCard
                    key={ `${strDrink}-${index}` }
                    recipeImage={ strDrinkThumb }
                    recipeName={ strDrink }
                    index={ index }
                    recipeId={ idDrink }
                  />
                );
              })
            )
        }
      </div>
    </div>
  );
}

export default Drinks;
