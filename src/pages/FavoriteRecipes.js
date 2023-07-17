import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesData = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesData) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesData));
    }
  }, []);

  return (
    <div>
      <h1>Favorite Recipes</h1>

      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      {favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ `${recipe.name} recipe` }
            data-testid={ `${index}-horizontal-image` }
          />
          {recipe.type === 'meal' ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          ) : (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholic ? 'Alcoholic'
                : 'Non-Alcoholic'}
            </p>
          )}
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <button
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          <button
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeartIcon } alt="Unfavorite" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
