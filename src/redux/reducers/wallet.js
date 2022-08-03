// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ADD_EXPENSE, UPDATE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, tendo as chaves id, value, currency, method, tag, description e exchangeRates
  // editor: false, // valor booleano que indica se uma despesa está sendo editada
  // idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.payload.expense, id: state.expenses.length }],
    };
  default:
    return state;
  }
}

export default walletReducer;
