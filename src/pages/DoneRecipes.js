import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const storedRecipes = localStorage.getItem('doneRecipes');
    if (storedRecipes) {
      setDoneRecipes(JSON.parse(storedRecipes));
    }
  }, []);

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

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const handleClearFilter = () => {
    setFilterType('');
  };

  const filteredRecipes = filterType
    ? doneRecipes.filter((recipe) => recipe.type === filterType)
    : doneRecipes;

  return (
    <div>
      <button data-testid="filter-by-all-btn" onClick={ handleClearFilter }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => handleFilter('meal') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => handleFilter('drink') }>
        Drinks
      </button>

      <div id="done-recipes">
        {filteredRecipes.map((recipe, index) => (
          <div className="recipe-card" key={ index }>
            <Link to={ `/meals/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
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
                {recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}

              </p>
            )}
            <Link to={ `/drinks/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ copyUrlToClipboard }
            >
              <img src={ shareIcon } alt="Compartilhar" />
            </button>

            {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
              <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>

      {copyMessage && <p>{copyMessage}</p>}
    </div>
  );
}

export default DoneRecipes;
