import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Typography, withStyles} from '@material-ui/core';

const styles = theme => ({
  appBar: {
    top: -1,
    background: theme.palette.appBar.backgroundColor,
    transition: 'box-shadow .1s ease',
    boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
  },
  schrolled: {
    boxShadow: 'none'
  },
  titulo: {
    color: "#000"
  }
});

class AppBarCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schrolled: false
    };
  }

  componentDidMount(){
    const self = this;
    function schrolled(){
      if(window.scrollY > 32) {
        if(!self.state.schrolled) {
          self.setState({schrolled: true})
        }
      } else {
        if(self.state.schrolled) {
          self.setState({schrolled: false})
        }
      }
    }

    window.onscroll = schrolled;
  }


  render() {
    const { classes, titulo } = this.props;
    const { schrolled } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={[classes.appBar, !schrolled ? classes.schrolled : ''].join(' ')}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.titulo}>
              {titulo}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBarCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarCustom);