import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getMealDetails, getDrinkDetails } from '../redux/actions';
import DetailsCard from '../components/DetailsCard';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const recipeDetails = useSelector((state) => state.recipeDetailsReducer.recipeDetails);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const filterIngredientsAndMeasures = useCallback(() => {
    if (recipeDetails.length > 0) {
      const filteredIngredients = Object.entries(recipeDetails[0]).filter(
        ([key, value]) => {
          const isIngredient = key.includes('strIngredient');
          const isValueValid = value !== null && value !== '';
          return isIngredient && isValueValid;
        },
      ).map(([, value]) => value);
      const filterMeasures = Object.entries(recipeDetails[0]).filter(
        ([key, value]) => {
          const isMeasure = key.includes('strMeasure');
          const isValueValid = value !== null && value !== ' ';
          return isMeasure && isValueValid;
        },
      ).map(([, value]) => value);

      setIngredients(filteredIngredients);
      setMeasures(filterMeasures);
    }
  }, [recipeDetails]);

  useEffect(() => {
    if (currentPath.includes('meals')) dispatch(getMealDetails(id));
    if (currentPath.includes('drinks')) dispatch(getDrinkDetails(id));
  }, [currentPath, dispatch, id]);

  useEffect(() => {
    filterIngredientsAndMeasures();
  }, [filterIngredientsAndMeasures, recipeDetails]);

  return (
    recipeDetails.length > 0
    && <DetailsCard
      recipeImg={ currentPath.includes('meals')
        ? recipeDetails[0].strMealThumb : recipeDetails[0].strDrinkThumb }
      recipeTitle={ currentPath.includes('meals')
        ? recipeDetails[0].strMeal : recipeDetails[0].strDrink }
      recipeCategory={ currentPath.includes('meals')
        ? recipeDetails[0].strCategory : recipeDetails[0].strAlcoholic }
      recipeIngredients={ ingredients }
      recipeMeasures={ measures }
      recipeInstructions={ recipeDetails[0].strInstructions }
      recipeVideo={ currentPath.includes('meals') ? recipeDetails[0].strYoutube : '' }
    />
  );
}

export default RecipeDetails;
