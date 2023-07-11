import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ recipeImage, recipeName, index }) {
  return (
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
  );
}

RecipeCard.propTypes = {
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
