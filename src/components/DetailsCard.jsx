import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function DetailsCard({
  recipeImg, recipeTitle, recipeCategory,
  recipeIngredients, recipeMeasures, recipeInstructions, recipeVideo,
}) {
  const location = useLocation();
  const currentPath = location.pathname;
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
      <h1 data-testid="recipe-title">{ recipeTitle }</h1>
      <h2 data-testid="recipe-category">{ recipeCategory }</h2>
      <ul>
        {recipeIngredients.map((ingredient, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} - ${recipeMeasures[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ recipeInstructions }</p>
      {currentPath.includes('meals')
      && <iframe
        width="336"
        height="234"
        src={ `https://www.youtube.com/embed/${embedId()}` }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen
        title="Embedded youtube"
        data-testid="video"
      />}
    </div>
  );
}

export default DetailsCard;
