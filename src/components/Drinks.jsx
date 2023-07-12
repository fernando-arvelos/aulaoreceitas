import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredDrinks, getDrinkCategories, getDrinkRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';

function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.recipesReducer.drinks);
  const categories = useSelector((state) => state.recipesReducer.drinkCategories);
  const [enableFilter, setEnableFilter] = useState(false);
  const filteredDrinks = useSelector((state) => state.recipesReducer.filteredDrinks);
  const [lastClickedButton, setLastClickedButton] = useState(null);

  useEffect(() => {
    dispatch(getDrinkRecipes());
    dispatch(getDrinkCategories());
  }, []);

  function toggleFilter() {
    setEnableFilter((prevState) => !prevState);
  }

  const handleCategoryFilter = (category) => {
    setLastClickedButton(category);

    if (category === 'All') {
      setEnableFilter(false);
    } else if (lastClickedButton === category) {
      toggleFilter();
    } else if (lastClickedButton !== category) {
      dispatch(getFilteredDrinks(category));
      setEnableFilter(true);
    }
  };

  return (
    <div>
      <button
        onClick={ () => handleCategoryFilter('All') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        categories.map((category) => {
          const { strCategory } = category;

          return (
            <button
              key={ strCategory }
              onClick={ () => handleCategoryFilter(strCategory) }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </button>
          );
        })
      }
      <div>
        {
          enableFilter
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
              }))
            : (
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
