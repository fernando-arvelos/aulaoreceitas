import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getMealDetails, getDrinkDetails } from '../redux/actions';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPath.includes('meals')) dispatch(getMealDetails(id));
    if (currentPath.includes('drinks')) dispatch(getDrinkDetails(id));
  }, []);

  return (
    <h1>Recipe Details</h1>
  );
}

export default RecipeDetails;
