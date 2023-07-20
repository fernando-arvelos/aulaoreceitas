import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeIsFavorite,
  workFavorite } from '../helpers/localStoregefn';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const history = useHistory();
  const [recipeData, setRecipeData] = useState([]);
  const { pathname } = history.location;
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [copyed, setCopyed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = pathname.split('/')[1] === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipeData(data);
    };
    fetchData();
    setIsFavorite(!RecipeIsFavorite(pathname));
  }, [pathname]);

  useEffect(() => {
    const savedIngredients = localStorage.getItem('checkedIngredients');
    if (savedIngredients) {
      setCheckedIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  const dataRender = pathname
    .split('/')[1] === 'drinks' ? recipeData?.drinks
    : recipeData?.meals;

  const getIngredients = () => {
    const numberLimit = 25;
    const listOfIngredients = [];
    if (dataRender) {
      for (let index = 1; index <= numberLimit; index += 1) {
        const ingredient = dataRender[0][`strIngredient${index}`];
        const measure = dataRender[0][`strMeasure${index}`];
        if (ingredient) {
          listOfIngredients.push(`${ingredient} - ${measure}`);
        }
      }
    }
    return listOfIngredients;
  };

  const ingredientsArray = getIngredients();

  const saveInLocalStorage = (event) => {
    const { name, checked } = event.target;
    const updatedIngredients = checked
      ? [...checkedIngredients, name]
      : checkedIngredients.filter((ingredient) => ingredient !== name);

    setCheckedIngredients(updatedIngredients);
    localStorage.setItem('checkedIngredients', JSON.stringify(updatedIngredients));
  };

  const scratchText = (event) => {
    const label = event.target.parentNode;

    if (event.target.checked) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
    saveInLocalStorage(event);
  };

  const isChecked = (ingredient) => checkedIngredients.includes(ingredient);

  const saveRecipe = () => {
    const dateNow = new Date();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipe = {
      id: dataRender[0].idMeal || dataRender[0].idDrink,
      nationality: dataRender[0].strArea || '',
      name: dataRender[0].strMeal || dataRender[0].strDrink,
      category: dataRender[0].strCategory || '',
      image: dataRender[0].strMealThumb || dataRender[0].strDrinkThumb,
      tags: dataRender[0].strTags === null ? [] : dataRender[0].strTags.split(','),
      alcoholicOrNot: dataRender[0].strAlcoholic || '',
      type: pathname.split('/')[1] === 'drinks' ? 'drink' : 'meal',
      doneDate: dateNow,
    };
    doneRecipes.push(recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  const onShare = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setCopyed(true);
    global.alert('Link copied!');
  };

  const onFavorite = () => {
    setIsFavorite(RecipeIsFavorite(pathname));
    workFavorite(recipeData, pathname);
  };

  const finish = checkedIngredients
    .filter((ingredient) => ingredientsArray.includes(ingredient));

  return (
    <div>
      {pathname.split('/')[1] === 'drinks'
      || pathname.split('/')[1] === 'meals' ? (
          dataRender
        && dataRender.length > 0
        && (
          <div>
            <img
              src={ dataRender[0].strDrinkThumb || dataRender[0].strMealThumb }
              alt=""
              data-testid="recipe-photo"
            />
            { copyed ? <p>Link copied!</p> : ''}
            <button
              onClick={ onShare }
              data-testid="share-btn"
            >
              <img
                src={ shareIcon }
                alt="share"
              />
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
            <h1 data-testid="recipe-title">
              {dataRender[0].strDrink || dataRender[0].strMeal}
            </h1>
            <h2 data-testid="recipe-category">{dataRender[0].strCategory}</h2>
            {pathname.split('/')[1] === 'drinks' && (
              <h3 data-testid="recipe-category">{dataRender[0].strAlcoholic}</h3>
            )}
            <div className="checkbox-container">
              {ingredientsArray.map((ingredient, index) => (
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
                    onChange={ (event) => scratchText(event) }
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
            <p data-testid="instructions">{dataRender[0].strInstructions}</p>
          </div>
        )
        ) : null}
      <button
        data-testid="finish-recipe-btn"
        disabled={ finish.length !== ingredientsArray.length }
        onClick={ saveRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
