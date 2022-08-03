// Formulário Wallet

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCurrenciesActionThunk } from '../redux/actions';
// import { getCurrenciesAction } from '../redux/actions';

const INITIAL_STATE = {
  value: 0,
  description: '',
  method: '',
  tag: '',
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

/* // Ao clicar no botão dispara o email e muda para a pg carteira
handleClick = () => {
  const { } = this.props;
  const { email } = this.state;
  login(email);

  history.push('/carteira');
} */

render() {
  const { value, description, method, tag } = this.state;
  const { currencies } = this.props;

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
        // value={ currency }
        onChange={ this.onInputChange }
        data-testid="currency-input"
      >
        {currencies.map((currency) => (
          <option key={ currency } value="valor1">
            {currency}
          </option>))}
      </select>

      Método de pagamento:
      <select
        name="method"
        value={ method }
        onChange={ this.onInputChange }
        data-testid="method-input"
      >
        <option value="valor1" selected>Dinheiro</option>
        <option value="valor2">Cartão de crédito</option>
        <option value="valor3">Cartão de débito</option>
      </select>

      Categoria:
      <select
        name="tag"
        value={ tag }
        onChange={ this.onInputChange }
        data-testid="tag-input"
      >
        <option value="valor1" selected>Alimentação</option>
        <option value="valor2">Lazer</option>
        <option value="valor3">Trabalho</option>
        <option value="valor4">Transporte</option>
        <option value="valor5">Saúde</option>
      </select>

      <br />

      <button
        type="submit"
        // onClick={ this.handleClick }
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
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
