import React, { useState, useEffect } from 'react';

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
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
          <button data-testid={ `${index}-horizontal-favorite-btn` }>Favorite</button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
