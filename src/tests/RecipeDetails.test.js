import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import fetch from '../../cypress/mocks/fetch';
import RecipeDetails from '../pages/RecipeDetails';

describe('Testa a página de receitas', () => {
  it('testa se as 6 categorias de Meals são renderizadas', async () => {
    global.fetch = fetch;
    renderWithRouterAndRedux(<RecipeDetails />, '/meals');
  });
});
