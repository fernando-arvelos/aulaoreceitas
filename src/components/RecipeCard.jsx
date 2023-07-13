import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeCard({ recipeImage, recipeName, index, recipeId }) {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleDetailPage = (id) => {
    if (currentPath === '/meals') history.push(`/meals/${id}`);
    if (currentPath === '/drinks') history.push(`/drinks/${id}`);
  };

  return (
    <button
      data-testid={ `${index}-recipe-card` }
      onClick={ () => handleDetailPage(recipeId) }
    >
      <img
        src={ recipeImage }
        alt={ recipeName }
        width="136px"
        height="134px"
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-card-name` }>{ recipeName }</h3>
    </button>
  );
}

RecipeCard.propTypes = {
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default RecipeCard;
