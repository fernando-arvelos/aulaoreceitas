import { screen } from '@testing-library/react';
import RecipeInProgress from '../../pages/RecipeInProgress';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testa o componente de Footer', () => {
  it('Testa se ocorre a renderização correta do componente Footer', () => {
    renderWithRouterAndRedux(<RecipeInProgress />);
    const img = screen.getByTestId('recipe-photo');

    expect(img).toBeInTheDocument();
  });
});
