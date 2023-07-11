import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [redirectToRecipes, setRedirectToRecipes] = useState(false);
  const [redirectToFavorites, setRedirectToFavorites] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : '';
    setUserEmail(email);
  }, []);

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleSaveClick = () => {
    const user = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(user));
    setIsSaved(true);
  };

  const handleDoneRecipesClick = () => {
    setRedirectToRecipes(true);
  };

  const handleFavoriteRecipesClick = () => {
    setRedirectToFavorites(true);
  };

  if (redirectToRecipes) {
    return <Redirect to="/done-recipes" />;
  }

  if (redirectToFavorites) {
    return <Redirect to="/favorite-recipes" />;
  }

  return (
    <div>
      <h1>Perfil</h1>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={ userEmail }
          onChange={ handleEmailChange }
        />
      </div>

      <div>
        <button onClick={ handleSaveClick }>Salvar</button>
      </div>

      {isSaved && (
        <div>
          <p>Email salvo com sucesso!</p>
        </div>
      )}

      <div>
        <h2>Seu e-mail:</h2>
        <span data-testid="profile-email">{userEmail}</span>
      </div>

      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ handleDoneRecipesClick }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ handleFavoriteRecipesClick }
        >
          Favorite Recipes
        </button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
