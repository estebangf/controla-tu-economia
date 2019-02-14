import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
        {content}
        {link}
      </div>
    )
  }
}

AuthPage.propTypes = {
  content: PropTypes.element.isRequired,
  link: PropTypes.element.isRequired,
};

export default withStyles(styles)(AuthPage);
