import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom/cjs/react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle }) {
  const [renderSearchBtn, setRenderSearchBtn] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    switch (location.pathname) {
    case '/meals':
      setRenderSearchBtn(true);
      break;
    case '/drinks':
      setRenderSearchBtn(true);
      break;
    case '/profile':
      setRenderSearchBtn(false);
      break;
    case '/done-recipes':
      setRenderSearchBtn(false);
      break;
    case '/favorite-recipes':
      setRenderSearchBtn(false);
      break;
    default:
      setRenderSearchBtn(false);
    }
  }, [location.pathname]);

  return (
    <header>
      <h1 data-testid="page-title">{pageTitle}</h1>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
      {renderSearchBtn && <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search"
      />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
