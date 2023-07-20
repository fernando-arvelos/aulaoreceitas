import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesData = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesData) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesData));
    }
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredRecipes(favoriteRecipes);
    } else if (filter === 'meals') {
      const meals = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
      setFilteredRecipes(meals);
    } else if (filter === 'drinks') {
      const drinks = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
      setFilteredRecipes(drinks);
    }
  }, [favoriteRecipes, filter]);

  const copyUrlToClipboard = () => {
    const url = 'http://localhost:3000/meals/52771';
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyMessage('Link copied!');
      })
      .catch((error) => {
        console.log('Error copying to clipboard:', error);
      });
  };

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const handleUnfavoriteClick = (recipeId) => {
    removeFromFavorites(recipeId);
  };

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  return (
    <>
      <Header pageTitle="Favorite Recipes" />
      <h1>Favorite Recipes</h1>

      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterClick('all') }
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterClick('meals') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterClick('drinks') }
      >
        Drinks

      </button>

      {filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/meals/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ `${recipe.name} recipe` }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
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
          <Link to={ `/drinks/${recipe.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          </Link>
          <button
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ copyUrlToClipboard }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          <button
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => handleUnfavoriteClick(recipe.id) }
          >
            <img src={ blackHeartIcon } alt="Unfavorite" />
          </button>
        </div>
      ))}
      {copyMessage && <p>{copyMessage}</p>}
    </>
  );
}

export default FavoriteRecipes;
