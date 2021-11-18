import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const isSignup = name === 'signup';
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleSubmitRedirect = (evt) => {
    handleSubmit(evt);
  };

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const disableFunction = () => {
    if (isSignup) {

      return !(credentials.username && credentials.email && credentials.password);
    }
    return !(credentials.username  && credentials.password);
  };

  return (
    <div id="auth">
      <form id="auth" onSubmit={handleSubmitRedirect} name={name}>
        <h1> {displayName} </h1>
        {isSignup ? (
          <div>
            <label htmlFor="email">
              <small>Email</small>
              {credentials.email ? null :<span className="required">*</span>}
            </label>
            <input
              name="email"
              type="text"
              onChange={handleChange}
              value={credentials.email}
            />
          </div>
        ) : (
          <div>
            <input type="hidden" name="email" value="" />
          </div>
        )}
        <div>
          <label htmlFor="username">
            <small>Username</small>
            {credentials.username ? null :<span className="required">*</span>}
          </label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            value={credentials.username}
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
            {credentials.password ? null :<span className="required">*</span>}
          </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={credentials.password}
          />
        </div>
        <div>
          <button type="submit" disabled={disableFunction()} >
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, email, password, formName, history));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
