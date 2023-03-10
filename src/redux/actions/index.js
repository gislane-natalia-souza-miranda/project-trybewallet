// Coloque aqui suas actions
import { fetchCurrencies, fetchExchangeRates } from '../../services/awesomeAPI';

export const LOGIN = 'LOGIN';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES ';
export const UPDATE_CURRENCIES_ERROR = 'UPDATE_CURRENCIES ';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXPENSE_ERROR = 'ADD_EXPENSE_ERROR';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE_INITIAL = 'EDIT_EXPENSE_INITIAL';
export const EDIT_EXPENSE_FINAL = 'EDIT_EXPENSE_FINAL';

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

// Thunk que acessa a api e pega as currencies
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

// envia a despesa para o estado global
export const addExpenseAction = (expense) => ({
  type: ADD_EXPENSE,
  payload: {
    expense,
  },
});

export const addExpenseActionError = (error) => ({
  type: ADD_EXPENSE_ERROR,
  error,
});

// Thunk que acessa a api e pega exchangeRates
export const updateExchangeRatesActionThunk = (expense) => async (dispatch) => {
  // dispatch(loading());
  try {
    const exchangeRates = await fetchExchangeRates(); // RECEBE DA API
    const payload = {
      ...expense,
      exchangeRates,
    };
    dispatch(addExpenseAction(payload));
  } catch (err) {
    dispatch(addExpenseActionError(err));
  }
};

// delete uma despesa da tabela
export const deleteExpenseAction = (id) => ({
  type: DELETE_EXPENSE,
  payload: {
    id,
  },
});

//  inicia a edi????o de uma despesa da tabela
export const editExpenseInitialAction = (id) => ({
  type: EDIT_EXPENSE_INITIAL,
  payload: {
    id,
  },
});

// finaliza a edi????o de uma despesa da tabela
export const editExpenseFinalAction = (expensesEdit) => ({
  type: EDIT_EXPENSE_FINAL,
  payload: {
    expensesEdit,
  },
});
