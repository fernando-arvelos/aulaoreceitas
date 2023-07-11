import React, { useState, useEffect } from 'react';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : '';
    setUserEmail(email);
  }, []);

  return (
    <div>
      <h1>Perfil</h1>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={ email }
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
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
