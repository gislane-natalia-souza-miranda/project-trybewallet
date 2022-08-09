// Formulário Wallet

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenseFinalAction, updateCurrenciesActionThunk,
  updateExchangeRatesActionThunk } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
class WalletForm extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount = async () => {
    const { updateCurrencies } = this.props;
    await updateCurrencies();
  }

// Pega o que foi digitado no input e atualiza o estado.
onInputChange = ({ target }) => {
  const { name } = target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  this.setState({ [name]: value });
}

// cria o expenseEdit que é um array com as chaves editadas.
despesasModificadas = () => {
  const { expenses, idToEdit } = this.props;
  const { value, description, currency, method, tag } = this.state;
  const indexExpenseOriginal = expenses.findIndex((expense) => expense.id === idToEdit);

  const expensesEdit = [...expenses];
  if (value.length && value !== expenses[indexExpenseOriginal].value) {
    expensesEdit[indexExpenseOriginal] = { ...expensesEdit[indexExpenseOriginal], value };
  }

  if (description.length && description !== expenses[indexExpenseOriginal].description) {
    expensesEdit[indexExpenseOriginal] = { ...expensesEdit[indexExpenseOriginal],
      description };
  }

  if (currency !== expenses[indexExpenseOriginal].currency) {
    expensesEdit[indexExpenseOriginal] = { ...expensesEdit[indexExpenseOriginal],
      currency };
  }

  if (method !== expenses[indexExpenseOriginal].method) {
    expensesEdit[indexExpenseOriginal] = { ...expensesEdit[indexExpenseOriginal],
      method };
  }

  if (tag !== expenses[indexExpenseOriginal].tag) {
    expensesEdit[indexExpenseOriginal] = { ...expensesEdit[indexExpenseOriginal], tag };
  }

  return expensesEdit;
}

// salvar as informações da despesa no estado global e atualizar a soma de despesas no header
 handleClick = () => {
   const { value, description, currency, method, tag } = this.state;
   const { editor } = this.props;

   if (editor) {
     const { editDespesaFinal } = this.props;

     const expensesEdit = this.despesasModificadas();

     editDespesaFinal(expensesEdit);
   } else {
     const { addDespesa } = this.props;
     addDespesa({ value, description, currency, method, tag });
   }

   this.setState(INITIAL_STATE);
 }

 render() {
   const { value, description, currency, method, tag } = this.state;
   const { currencies, editor } = this.props;

   /*  if (editor) {
     const { expenses, idToEdit } = this.props;
     const expenseEdit = expenses.find((expense) => expense.id === idToEdit);
     console.log('DidMount', expenseEdit);
     this.setState({
       value: expenseEdit.value,
       description: expenseEdit.description,
       currency: expenseEdit.currency,
       method: expenseEdit.method,
       tag: expenseEdit.tag,
     });
   } */

   return (
     <fieldset>
       Comp WalletForm
       <br />
       Valor:
       <input
         label="Valor: "
         type="number"
         value={ value }
         onChange={ this.onInputChange }
         name="value"
         data-testid="value-input"
       />

       Descrição da despesa:
       <input
         label="Descrição: "
         type="text"
         onChange={ this.onInputChange }
         value={ description }
         name="description"
         data-testid="description-input"
       />

       Moeda:
       <select
         name="currency"
         value={ currency }
         onChange={ this.onInputChange }
         data-testid="currency-input"
       >
         {currencies.map((currencyy) => (
           <option key={ currencyy } value={ currencyy }>
             {currencyy}
           </option>))}
       </select>

       Método de pagamento:
       <select
         name="method"
         value={ method }
         onChange={ this.onInputChange }
         data-testid="method-input"
       >
         <option value="Dinheiro" selected>Dinheiro</option>
         <option value="Cartão de crédito">Cartão de crédito</option>
         <option value="Cartão de débito">Cartão de débito</option>
       </select>

       Categoria:
       <select
         name="tag"
         value={ tag }
         onChange={ this.onInputChange }
         data-testid="tag-input"
       >
         <option value="Alimentação">Alimentação</option>
         <option value="Lazer">Lazer</option>
         <option value="Trabalho">Trabalho</option>
         <option value="Transporte">Transporte</option>
         <option value="Saúde">Saúde</option>
       </select>

       <br />

       <button
         type="submit"
         onClick={ this.handleClick }
       >
         {editor ? 'Editar despesa' : 'Adicionar despesa'}
       </button>

     </fieldset>
   );
 }
}

// buscando as informações do estado global
const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(updateCurrenciesActionThunk()),
  addDespesa: (expense) => dispatch(updateExchangeRatesActionThunk(expense)),
  editDespesaFinal: (expensesEdit) => dispatch(editExpenseFinalAction(expensesEdit)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateCurrencies: PropTypes.func.isRequired,
  addDespesa: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editDespesaFinal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
