import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthPage from '../components/AuthPage';

class SignInPage extends Component {
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
    const errors = {};

    if (!email) {
      errors.email = 'emailRequired';
    }
    if (!password) {
      errors.password = 'passwordRequired';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      } else {
//        this.redirectTo('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div>
        <h1>
          {'signIn'}
        </h1>
        <p>
          {'signInReason'}
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
          <button type="submit">
            {'signInButton'}
          </button>
        </form>
      </div>
    );

    const link = (
      <Link to="/join">
        {'needAccount'}
      </Link>
    );

   // return this.renderRedirect() ||
    return <AuthPage content={content} link={link} menuOpen={this.props.menuOpen} />;
  }
}

SignInPage.propTypes = {

};

export default SignInPage;
