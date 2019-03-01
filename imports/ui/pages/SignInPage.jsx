import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthPage from '../components/AuthPage';
import { withStyles, Typography, TextField, Paper, Button, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  titulo:{
    textAlign: 'center',
    marginBottom: 5
  },
  subtitulo:{
    textAlign: 'center',
    marginBottom: 15
  },
  textField:{
    marginBottom: 50
  },
  btnSignin: {
    float: 'right'
  },
  link:{
    textDecoration: 'none'
  }
});

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      showPassword: false
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

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    const { errors, showPassword } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div>
        <Typography variant="h4" className={classes.titulo}>Inicio de Sesion</Typography>
        <Typography variant="subtitle1" gutterBottom className={classes.subtitulo}>Controla tu Economia</Typography>
        <form onSubmit={this.onSubmit}>
          {errorMessages.map((msg, index) => (
              <Typography key={"error"+index} variant="h6" className={classes.titulo}>{msg}</Typography>
          ))}
          <TextField
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
            fullWidth={true}
            ref={(c) => { this.email = c; }}
            label="E-Mmail"
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            name="password"
            margin="normal"
            variant="outlined"
            fullWidth={true}
            className={classes.textField}
            ref={(c) => { this.password = c; }}
            label="Contraseña"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Link to="/join" className={classes.link}>
            <Button>
              Crear cuenta
            </Button>
          </Link>
          <Button variant="contained" color="primary" type="submit" className={classes.btnSignin}>
            Iniciar sesion
          </Button>
        </form>
      </div>
    );

    return <AuthPage content={content} menuOpen={this.props.menuOpen} />;
  }
}

SignInPage.propTypes = {

};

export default withStyles(styles)(SignInPage);
