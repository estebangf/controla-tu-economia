import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com',
'user02@gmail.com', 'user02@gmail.com'];

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const styles = theme => ({
  avatar: {
    width: 40,
    height: 40,
  },
  root: {
    padding: 0,
    paddingTop: 5,
  },
  dialog: {
    /*
    [theme.breakpoints.down('md')]: {
      maxHeight: 'calc(100% - 80px)',
      minWidth: 'calc(100% - 80px)',
      margin: 40
    }
    */
  }
});

class Alerta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      multipleSelect: []
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handleListItemClick = (id) => {
    const {
      onChange,
      multiple,
      value
    } = this.props;
    var multipleSelect = value

    const event = { target: { value: '' } };

    if(multiple){
      if(multipleSelect.includes(id)){
        event.target.value = 
          multipleSelect.filter((item) => {
            return item != id
          })
        onChange(event);
        this.handleOpen();
      } else {
        event.target.value = [...multipleSelect, id]
        onChange(event)
        this.handleOpen();
      }
    } else {
      event.target.value = id
      onChange(event);
      this.handleClose();
    }
  }

  render() {
    const {
      classes,
      items,
      id,
      text,
      avatar,
      value,
      title,
      imgFolder,
      openAutomatic,
      color,
      multiple
    } = this.props;

    const {
      open
    } = this.state

    const selectedItems = items.filter((item) => {
      if(multiple) {
        return value.includes(item[id])
      } else {
        return item[id] == value
      }
    })

    const defaultColor = !!color ? color : "transparent";

    const selectedText = !!selectedItems.length ?
      multiple ? 
        selectedItems.map((i) => {
          return i[text]+ ", "
        })
        :
        selectedItems[0][text] : "Sin "+title
    const selectedAvatar = !!selectedItems.length ? selectedItems[0][avatar] : "Sin Avatar"
    const selectedColor = !!selectedItems.length ? selectedItems[0].color : defaultColor

    return (
      <React.Fragment>
        <List className={classes.root}>
          <ListItem
            button
            onClick={this.handleOpen}
          >
            {!multiple ? 
              <ListItemAvatar>
                <Avatar
                  imgProps={{
                    onerror: "this.src='/imagenes/imgNotFound.png'"
                  }}
                  style={{
                    backgroundColor: !!selectedColor ? selectedColor : defaultColor
                  }}
                  size="8" className={classes.avatar}
                  src={"/imagenes/" + imgFolder + "/" + selectedAvatar.replace(" ","_") + ".png"}
                />
              </ListItemAvatar>
            : ''}
            <ListItemText
              primary={selectedText}
            />
          </ListItem>
        </List>
        <Dialog
          onClose={this.handleClose}
          PaperProps={{
            className: classes.dialog
          }}
          fullWidth={true}
          open={open || openAutomatic}>
          <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
          <List>
            <ListItem disabled key={''}>
              <ListItemText primary={"Sin "+title} />
            </ListItem>
            {items.map(item => (
              <ListItem selected={multiple ? value.includes(item[id]) : value == item[id]} button onClick={() => this.handleListItemClick(item[id])} key={item[id]}>
                <ListItemAvatar>
                  <Avatar
                    imgProps={{
                      onerror: "this.src='/imagenes/imgNotFound.png'"
                    }}
                    style={{
                      backgroundColor: !!item.color ? item.color : defaultColor
                    }}
                    src={"/imagenes/" + imgFolder + "/" + item[text].replace(" ","_") + ".png"}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary={item[text]} />
              </ListItem>
            ))}
{/*
            <ListItem button onClick={() => handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
*/}
          </List>
        </Dialog>
      </React.Fragment>
    );
  }
}

Alerta.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Alerta);
