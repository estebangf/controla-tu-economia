import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = {
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
      <div>
        {!!Meteor.userId() ?
          <div>
            <Typography variant="h5">Ya iniciaste sesion!</Typography>
            <Typography variant="h3">¡Bienvenido!</Typography>
          </div>
        :
          <div>
            {content}
            {link}
          </div>
        }
      </div>
    )
  }
}

AuthPage.propTypes = {
  content: PropTypes.element.isRequired,
  link: PropTypes.element.isRequired,
};

export default withStyles(styles)(AuthPage);
