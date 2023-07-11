const getDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  if (!response.ok) throw new Error('Erro na requisição da API de drinks!');

  return data.drinks;
};

export default getDrinks;
