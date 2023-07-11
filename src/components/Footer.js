import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <img
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drinks"

      />

      <img
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        alt="meals"
      />
    </footer>
  );
}

export default Footer;
