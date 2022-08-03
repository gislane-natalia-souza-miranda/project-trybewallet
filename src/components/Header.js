import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  cambio: 'BRL',
};
class Header extends Component {
  state = {
    ...INITIAL_STATE,
  }

  despesaTotal = () => {
    const { expenses } = this.props;
    let somaTotal = 0;
    expenses.forEach(
      (expense) => {
        somaTotal += expense.value * expense.exchangeRates[expense.currency].ask;
      },
    );
    return somaTotal.toFixed(2); // tofixed(2) arrendodamento 2 casa decimais
  };

  render() {
    const { email } = this.props;
    const { cambio } = this.state;

    return (

      <fieldset>
        Comp Header
        <div>
          Email:
          <span data-testid="email-field">{ email }</span>
        </div>

        <div>
          Despesa:
          <span data-testid="total-field">
            { this.despesaTotal() }
          </span>
        </div>

        <div>
          Câmbio:
          <span data-testid="header-currency-field">{ cambio }</span>
        </div>
      </fieldset>

    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  ...user,
  ...wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  // cambio: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
