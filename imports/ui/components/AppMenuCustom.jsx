import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListSubheader from '@material-ui/core/ListSubheader';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
    ['-webkit-flex-direction']: 'column'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
  divider: {
    backgroundColor: '#ffffff1f',
  },
  listaMedia: {
    backgroundColor: theme.palette.secondary.dark,
    position: 'relative',
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  listItemText:{
    color: theme.palette.secondary.contrastText,
  },
  listaFooter:{
    flex: '0 0 auto'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 6,
    height: window.innerHeight - 64,
    marginTop: 64,
    paddingTop: 0,
    overflowY: 'auto'
  },
});

class AppMenuCustom extends Component {
  render() {
    const { classes, open, handleMenu } = this.props;

    return (
      <SwipeableDrawer
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onOpen={handleMenu}
        onClose={handleMenu}
        anchor="left" >
        <List className={classes.toolbar}>
          {['Titulo'].map((text, index) => (
            <ListItem button key={text+index} >
              <ListItemIcon className={classes.listItemText}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primaryTypographyProps={{className: classes.listItemText}} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider}/>
        <List
          id="listaMedia"
          className={classes.listaMedia}
          subheader={<ListSubheader className={classes.listItemText}>Lista grande</ListSubheader>}
          >
          {['Inbox', 'Starred', 'Send email','Inbox', 'Starred', 'Send email','Inbox', 'Starred', 'Send email','Inbox', 'Starred', 'Send email','Inbox', 'Starred', 'Send email', 'Drafts zzz'].map((text, index) => (
            <ListItem button key={text+index}>
              <ListItemIcon className={classes.listItemText}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primaryTypographyProps={{className: classes.listItemText}} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider}/>
        <List className={classes.listaFooter}>
          {['Ultimo 1', 'Ultimo 2'].map((text, index) => (
            <ListItem button key={text+index}>
              <ListItemIcon className={classes.listItemText}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primaryTypographyProps={{className: classes.listItemText}} primary={text} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    );
  }
}

AppMenuCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppMenuCustom);
