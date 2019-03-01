import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';

const styles = {
  root:{
    backgroundImage: 'url("/fondo.jpg")',
    width: '100%',
    height: '100%'
  },
  paper:{
    maxWidth: 300,
    minWidth: 300,
    padding: 25,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    margin: 'auto',
  }
};

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      classes,
      content,
      link
    } = this.props;
    
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {!!Meteor.userId() ?
            <div>
              <Typography variant="h5">Ya iniciaste sesion!</Typography>
              <Typography variant="h3">¡Bienvenid@!</Typography>
            </div>
          :
            <div>
              {content}
              {link}
            </div>
          }
        </Paper>
      </div>
    )
  }
}

AuthPage.propTypes = {
  content: PropTypes.element.isRequired,
  link: PropTypes.element.isRequired,
};

export default withStyles(styles)(AuthPage);
