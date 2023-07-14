import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkRecipes, getMealRecipes } from '../redux/actions';
import RecommendationsCard from './RecommendationsCard';

function DetailsCard({
  recipeImg,
  recipeTitle,
  recipeCategory,
  recipeIngredients,
  recipeMeasures,
  recipeInstructions,
  recipeVideo,
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipesReducer.meals);
  const drinks = useSelector((state) => state.recipesReducer.drinks);

  useEffect(() => {
    if (currentPath.includes('meals')) dispatch(getDrinkRecipes());
    if (currentPath.includes('drinks')) dispatch(getMealRecipes());
  }, []);

  const embedId = () => {
    if (recipeVideo) {
      const urlParams = new URLSearchParams(new URL(recipeVideo).search);
      const videoId = urlParams.get('v');
      return videoId;
    }
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeImg }
        alt={ recipeTitle }
        width="362"
        height="162"
      />
      <h1 data-testid="recipe-title">{recipeTitle}</h1>
      <h2 data-testid="recipe-category">{recipeCategory}</h2>
      <ul>
        {recipeIngredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${recipeMeasures[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipeInstructions}</p>
      {currentPath.includes('meals') && (
        <iframe
          width="336"
          height="234"
          src={ `https://www.youtube.com/embed/${embedId()}` }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
          title="Embedded youtube"
          data-testid="video"
        />
      )}
      <RecommendationsCard recipes={ currentPath.includes('meals') ? drinks : meals } />
    </div>
  );
}

DetailsCard.propTypes = {
  recipeImg: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeMeasures: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeInstructions: PropTypes.string.isRequired,
  recipeVideo: PropTypes.string.isRequired,
};

export default DetailsCard;
