// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { GET_CURRENCIES } from '../actions';

// import { DATA_WALLET } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies, // ??????
    };
  default:
    return state;
  }
}

export default walletReducer;
