import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};
class Login extends React.Component {
  state = { ...INITIAL_STATE };

// Pega o que foi digitado no input e atualiza o estado.
onInputChange = ({ target }) => {
  const { name } = target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  this.setState({ [name]: value });
}

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // verifica se button está habilitado com a restrição de password ter mais de 6 caracteres e email ser válido.
  isLoginButtonDisabled = () => {
    const { email, password } = this.state;
    const MINIMO_CARACTERES = 6;
    return password.trim().length < MINIMO_CARACTERES || !this.validateEmail(email); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/trim
  }

  // Ao clicar no botão dispara o email e muda para a pg carteira
  handleClick = () => {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);

    history.push('/carteira');
  }

  render() {
    // Recuperando as informações do estado criado no Redux
    const { email, password } = this.state;

    return (
      <div>
        <fieldset>

          <label htmlFor="email-input">
            Email:
            <input
              type="text"
              value={ email }
              onChange={ this.onInputChange }
              name="email"
              // required
              data-testid="email-input"
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              onChange={ this.onInputChange }
              value={ password }
              name="password"
              minLength="6"
              // required
              data-testid="password-input"
            />
          </label>
        </fieldset>
        <button
          type="submit"
          // type="button"
          disabled={ this.isLoginButtonDisabled() }
          onClick={ this.handleClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (obj) => dispatch(loginAction(obj)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
