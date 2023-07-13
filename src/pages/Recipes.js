import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  return (
    <Switch>
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
    </Switch>
  );
}

export default Recipes;
