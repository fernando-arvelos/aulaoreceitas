import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = localStorage.getItem('doneRecipes');
    if (storedRecipes) {
      setDoneRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  return (
    <div>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      <div id="done-recipes">
        {doneRecipes.map((recipe, index) => (
          <div className="recipe-card" key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            {recipe.type === 'meal' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
              </p>
            )}
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button src={ shareIcon } data-testid={ `${index}-horizontal-share-btn` }>
              <img src={ shareIcon } alt="Share" />
            </button>

            {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
              <span
                key={ tagIndex }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
