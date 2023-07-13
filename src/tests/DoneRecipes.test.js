import React from 'react';
import { render, screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';

test('renders alcoholic or non-alcoholic drink information', () => {
  const doneRecipes = [
    {
      image: 'drink-image-1.jpg',
      name: 'Drink 1',
      type: 'drink',
      alcoholic: true,
      doneDate: '2023-07-13',
      tags: ['tag1', 'tag2'],
    },
    {
      image: 'drink-image-2.jpg',
      name: 'Drink 2',
      type: 'drink',
      alcoholic: false,
      doneDate: '2023-07-14',
      tags: ['tag3', 'tag4'],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  render(<DoneRecipes />);

  const alcoholicDrinkText = screen.getByTestId('0-horizontal-top-text');
  expect(alcoholicDrinkText).toHaveTextContent('Alcoholic');

  const nonAlcoholicDrinkText = screen.getByTestId('1-horizontal-top-text');
  expect(nonAlcoholicDrinkText).toHaveTextContent('Non-Alcoholic');
});
