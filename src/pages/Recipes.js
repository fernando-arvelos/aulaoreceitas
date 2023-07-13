import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    currentPath === '/meals'
      ? <Meals />
      : <Drinks />
  );
}

export default Recipes;
