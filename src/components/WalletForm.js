// Formulário

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrenciesAction } from '../redux/actions';
import fetchCurrencies from '../services/awesomeAPI';

class WalletForm extends Component {
  componentDidMount() {
    fetchCurrencies().then((response) => console.log(response));
  }

  render() {
    return (

      <fieldset>
        Comp WalletForm

        Valor:
        <input
          label="Valor: "
          type="text"
          value={ valor }
          // onChange={ this.onInputChange }
          name="Valor"
          required
          data-testid="value-input"
        />

        Descrição da despesa:
        <input
          label="Descrição: "
          type="text"
          // onChange={ this.onInputChange }
          value={ descricao }
          name="descricao"
          required
          data-testid="description-input"
        />

        Moeda:
        <select name="select" data-testid="currency-input">
          <option value="valor1">Valor 1</option>
          <option value="valor2" selected>Valor 2</option>
          <option value="valor3">Valor 3</option>
        </select>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (payload) => dispatch(getCurrenciesAction(payload)),
});

export default connect(null, mapDispatchToProps)(WalletForm);
