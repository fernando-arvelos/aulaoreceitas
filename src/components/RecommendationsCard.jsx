import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { arrayOf, shape, string } from 'prop-types';

function RecommendationsCard({ recipes }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const maxRecommendations = 6;

  return (
    <Slider { ...settings } data-testid="recommendation-card">
      { recipes.length > 0 && recipes.filter(
        (recipe, index) => index < maxRecommendations,
      ).map((recommendation, index) => (
        <div
          key={ recommendation.strDrink || recommendation.strMeal }
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            src={ recommendation.strDrinkThumb || recommendation.strMealThumb }
            alt={ recommendation.strDrink || recommendation.strMeal }
            width="136px"
            height="134px"
          />
          <h3 data-testid={ `${index}-recommendation-title` }>
            { recommendation.strDrink || recommendation.strMeal }
          </h3>
        </div>
      ))}
    </Slider>
  );
}

RecommendationsCard.propTypes = {
  recipes: arrayOf(
    shape({
      strDrink: string,
      strMeal: string,
      strDrinkThumb: string,
      strMealThumb: string,
    }),
  ).isRequired,
};

export default RecommendationsCard;
