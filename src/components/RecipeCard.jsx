import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeCard({ recipeImage, recipeName, index, recipeId }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Link to={ currentPath === '/meals' ? `/meals/${recipeId}` : `/drinks/${recipeId}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipeImage }
          alt={ recipeName }
          width="136px"
          height="134px"
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` }>{ recipeName }</h3>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default RecipeCard;
