import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import ListIngredientsMeals from './ListIngredientsMeals';
import { RecipeIsFavorite,
  workFavorite } from '../helpers/localStoregefn';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function MealsInProgress() {
  const [copyed, setCopyed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [meals, setMeals] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const mealsFiltred = meals.filter((meal) => meal.idMeal === recipeId);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      const response = await fetch(url);
      const data = await response.json();
      setMeals(data.meals);
      setDataMeals(data);
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
    workFavorite(dataMeals, pathname);
  };

  // console.log(mealsFiltred);
  return (
    <main>
      <div>
        {
          mealsFiltred.map((meal) => (
            <div key={ meal.idMeal }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid="recipe-photo"
                className="w-52"
              />

              <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
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

              <h3 data-testid="recipe-category">{ meal.strCategory }</h3>

              <h2>Ingredients</h2>
              <ListIngredientsMeals />

              <h2>instructions</h2>
              <p data-testid="instructions">{ meal.strInstructions }</p>

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
