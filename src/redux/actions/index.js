// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES ';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

// action currencies
export const getCurrenciesAction = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

/* export const receiveCurrencies = () => ({
  type: RECEIVE_CURRENCIES, currencies }); */
