// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ADD_EXPENSE, UPDATE_CURRENCIES, DELETE_EXPENSE, /* EDIT_EXPENSE_FINAL */
  EDIT_EXPENSE_INITIAL,
  EDIT_EXPENSE_FINAL } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
    };
  case EDIT_EXPENSE_INITIAL:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.id,
    };
  case EDIT_EXPENSE_FINAL:
    return {
      ...state,
      expenses: action.payload.expensesEdit,
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
}

export default walletReducer;
