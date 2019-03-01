import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

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
  btnJoin: {
    float: 'right'
  },
  link:{
    textDecoration: 'none'
  }
});

class JoinPage extends Component {
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
        <Typography variant="h4" className={classes.titulo}>Creacion de Cuenta</Typography>
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
            type='password'
            name="password"
            margin="normal"
            variant="outlined"
            fullWidth={true}
            ref={(c) => { this.password = c; }}
            label="Contraseña"
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            name="confirm"
            ref={(c) => { this.confirm = c; }}
            margin="normal"
            variant="outlined"
            fullWidth={true}
            className={classes.textField}
            label="Confirma contraseña"
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
          <Link to="/signin" className={classes.link}>
            <Button>
              Iniciar Sesion
            </Button>
          </Link>
          <Button variant="contained" color="primary" type="submit" className={classes.btnJoin}>
            Registrarse
          </Button>
        </form>
      </div>
    );
    
    return <AuthPage content={content} menuOpen={this.props.menuOpen} />;
  }
}

JoinPage.propTypes = {

};

export default withStyles(styles)(JoinPage);
