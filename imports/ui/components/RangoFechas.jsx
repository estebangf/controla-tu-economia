import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import blue from '@material-ui/core/colors/blue';

import Fechas from '../components/Fechas';

const styles = {
  content: {
    padding: 25,
    paddingTop: 0,
  },
};

class RangoFechas extends React.Component {
  render() {
    const {
      classes,
      open,
      handleRangoFechas,
      desde,
      hasta,
      handleDateChange,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleRangoFechas}>
        <DialogTitle>Rango de fechas</DialogTitle>
        <div className={classes.content}>
          <Fechas
            id={'desde'}
            fecha={desde}
            adornmentPosition="end"
            autoOk={true}
            keyboard={true}
            disableFuture={true}
            variant="standard"
            label="Desde"
            maxDate={new Date()}
            maxDateMessage={"Fecha mayor a hoy"}
            invalidDateMessage={"Ej: 01/01/2019"}
            handleDateChange={handleDateChange}
            inputRoot={classes.inputFechaRoot}
          />
          <Fechas
            id={'hasta'}
            fecha={hasta}
            adornmentPosition="end"
            autoOk={true}
            keyboard={true}
            disableFuture={false}
            variant="standard"
            label="Hasta"
            invalidDateMessage={"Ej: 01/01/2019"}
            handleDateChange={handleDateChange}
            inputRoot={classes.inputFechaRoot}
          />
        </div>
      </Dialog>
    );
  }
}

export default  withStyles(styles)(RangoFechas);