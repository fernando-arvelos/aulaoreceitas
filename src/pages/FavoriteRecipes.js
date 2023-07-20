import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../index.css';
import Footer from '../components/Footer';

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
    <div>
      <Header pageTitle="Favorite Recipes" />
      <div className="flex flex-col items-center">

        <img className="mb-2 mt-5" src="/img/favoriteRecipes.svg" alt="favorite" />
        <h1
          className="text-red text-xl font-black uppercase tracking-widest mb-9"
        >
          Favorite Recipes
        </h1>

        <div className="flex mb-6">
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilterClick('all') }
            className="btn-filter"
          >
            All

          </button>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => handleFilterClick('meals') }
            className="btn-filter"
          >
            Meals

          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilterClick('drinks') }
            className="btn-filter"
          >
            Drinks

          </button>
        </div>

        {filteredRecipes.map((recipe, index) => (
          <div
            key={ index }
            className="flex w-[318px] h-[135px] bg-white rounded-[5px] border border-gray mb-4"
          >
            <Link to={ `/meals/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ `${recipe.name} recipe` }
                data-testid={ `${index}-horizontal-image` }
                className="w-[164px] h-[135px] rounded-tl-[5px] rounded-bl-[5px] z-[-1]"
              />
            </Link>
            <div className="ml-5">
              <div className="mt-8">
                <Link to={ `/drinks/${recipe.id}` }>
                  <h3
                    data-testid={ `${index}-horizontal-name` }
                    className="w-[86px] text-gray text-xl font-bold"
                  >
                    {recipe.name}
                  </h3>
                </Link>
                {recipe.type === 'meal' ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="text-gray text-[9px] font-light"
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                ) : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="text-gray text-[9px] font-light"
                  >
                    {recipe.alcoholic ? 'Alcoholic'
                      : 'Non-Alcoholic'}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <button
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ copyUrlToClipboard }
                >
                  <img src={ shareIcon } height="22" width="22" alt="Share" />
                </button>
                <button
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleUnfavoriteClick(recipe.id) }
                >
                  <img src={ blackHeartIcon } height="22" width="22" alt="Unfavorite" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {copyMessage && <p>{copyMessage}</p>}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
