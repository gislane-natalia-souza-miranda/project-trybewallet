// Coloque aqui suas actions
import fetchCurrencies from '../../services/awesomeAPI';

export const LOGIN = 'LOGIN';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES ';
export const UPDATE_CURRENCIES_ERROR = 'UPDATE_CURRENCIES ';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

// action currencies
// verificar se este currencies sendo passado esta correto ?????
export const updateCurrenciesAction = (currencies) => ({
  type: UPDATE_CURRENCIES,
  payload: currencies,
});

export const updateCurrenciesActionError = (error) => ({
  type: UPDATE_CURRENCIES_ERROR,
  error,
});

export const updateCurrenciesActionThunk = () => async (dispatch) => {
  // dispatch(loading());
  try {
    const currencies = await fetchCurrencies(); // RECEBE DA API
    const payload = {
      currencies,
    };
    dispatch(updateCurrenciesAction(payload));
  } catch (err) {
    dispatch(updateCurrenciesActionError(err));
  }
};
