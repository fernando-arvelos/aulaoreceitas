import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { useSelector } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function HeaderRecipe() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const recipeDetails = useSelector((state) => state.recipeDetailsReducer.recipeDetails);
  const typeOfRecipe = currentPath.match(/\/([^/]+)/)[1].replace(/s$/, '');
  const localStorageFavorites = localStorage.getItem('favoriteRecipes');
  const favoriteRecipes = localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes.some((
    favorite,
  ) => favorite.id === id));

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      const filterFavorite = favoriteRecipes.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
    } else {
      setIsFavorite(true);
      const newFavorite = {
        id,
        type: typeOfRecipe,
        nationality: recipeDetails[0].strArea || '',
        category: recipeDetails[0].strCategory || '',
        alcoholicOrNot: recipeDetails[0].strAlcoholic || '',
        name: recipeDetails[0].strMeal || recipeDetails[0].strDrink,
        image: recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb,
      };
      const newFavorites = [...favoriteRecipes, newFavorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  return (
    <div>
      <button data-testid="share-btn">
        <img src={ shareIcon } alt="share" />
      </button>
      <button onClick={ handleFavorite }>
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="like"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

export default HeaderRecipe;
