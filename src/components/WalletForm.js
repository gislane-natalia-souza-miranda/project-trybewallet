// Formulário Wallet

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCurrenciesActionThunk,
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

// salvar as informações da despesa no estado global e atualizar a soma de despesas no header
 handleClick = () => {
   const { value, description, currency, method, tag } = this.state;
   const { addDespesa } = this.props;
   addDespesa({ value, description, currency, method, tag });

   this.setState(INITIAL_STATE);
 }

 render() {
   const { value, description, currency, method, tag } = this.state;
   const { expenses, currencies } = this.props;
   console.log(expenses);

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
         data-testid="login-submit-button"
       >
         Adicionar despesa
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
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateCurrencies: PropTypes.func.isRequired,
  addDespesa: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
