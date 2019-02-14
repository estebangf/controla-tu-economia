import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import AuthPage from '../components/AuthPage';

class JoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const confirm = this.confirm.value;
    const errors = {};

    if (!email) {
      errors.email = 'emailRequired';
    }
    if (!password) {
      errors.password = 'passwordRequired';
    }
    if (confirm !== password) {
      errors.confirm = 'passwordConfirm';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
//      this.redirectTo('/');
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div>
        <h1>
          {'join'}
        </h1>
        <p>
          {'joinReason'}
        </p>
        <form onSubmit={this.onSubmit}>
          <div>
            {errorMessages.map(msg => (
              <div key={msg}>{msg}</div>
            ))}
          </div>
          <div>
            <input
              type="email"
              name="email"
              ref={(c) => { this.email = c; }}
              placeholder={'yourEmail'}
            />
            <span
              title={'yourEmail'}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              ref={(c) => { this.password = c; }}
              placeholder={'password'}
            />
            <span
              title={'password'}
            />
          </div>
          <div>
            <input
              type="password"
              name="confirm"
              ref={(c) => { this.confirm = c; }}
              placeholder={'confirmPassword'}
            />
            <span
              title={'confirmPassword'}
            />
          </div>
          <button type="submit">
            {'joinNow'}
          </button>
        </form>
      </div>
    );

    const link = (
      <Link to="/signin">
        {'haveAccountSignIn'}
      </Link>
    );

//    return this.renderRedirect() ||
    return <AuthPage content={content} link={link} menuOpen={this.props.menuOpen} />;
  }
}

JoinPage.propTypes = {

};

export default JoinPage;
