import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import ListIngredientsDrinks from './ListIngredientsDrinks';
import { RecipeIsFavorite,
  workFavorite } from '../helpers/localStoregefn';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function MealsInProgress() {
  const [copyed, setCopyed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const drinksFiltred = drinks.filter((meal) => meal.idDrink === recipeId);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      const response = await fetch(url);
      const data = await response.json();
      setDrinks(data.drinks);
      setDataDrinks(data);
    };
    fetchData();
    setIsFavorite(!RecipeIsFavorite(pathname));
  }, [pathname]);

  const onShare = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setCopyed(true);
    global.alert('Link copied!');
  };

  const onFavorite = () => {
    setIsFavorite(RecipeIsFavorite(pathname));
    workFavorite(dataDrinks, pathname);
  };

  console.log(drinks);
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
              { copyed ? <p>Link copied!</p> : ''}
              <button
                type="button"
                data-testid="share-btn"
                onClick={ onShare }
              >
                Share
              </button>

              <button
                onClick={ onFavorite }
              >
                <img
                  data-testid="favorite-btn"
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="share"
                />
              </button>

              <h3 data-testid="recipe-category">{ drink.strCategory }</h3>
              <h3 data-testid="recipe-category">{ drink.strAlcoholic }</h3>

              <h2>Ingredients</h2>
              <ListIngredientsDrinks drinks={ drinks } />

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
