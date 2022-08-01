import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  despesa: 0,
  cambio: 'BRL',
};
class Header extends Component {
  state = {
    ...INITIAL_STATE,
  }

  render() {
    const { email } = this.props;
    const { despesa, cambio } = this.state;

    return (

      <fieldset>
        Comp Header
        <div>
          Email:
          <span data-testid="email-field">{ email }</span>
        </div>

        <div>
          Despesa:
          <span data-testid="total-field">{ despesa }</span>
        </div>

        <div>
          Câmbio:
          <span data-testid="header-currency-field">{ cambio }</span>
        </div>
      </fieldset>

    );
  }
}

const mapStateToProps = ({ user }) => ({
  ...user,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // despesa: PropTypes.number.isRequired,
  // cambio: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
