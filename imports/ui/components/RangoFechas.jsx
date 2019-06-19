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


const HOY_M = new Date()
HOY_M.setHours(0)
HOY_M.setMinutes(0)
HOY_M.setSeconds(0)
HOY_M.setMilliseconds(0)

const HOY_N = new Date()
HOY_N.setHours(23)
HOY_N.setMinutes(59)
HOY_N.setSeconds(59)
HOY_N.setMilliseconds(99)

const INICIO_MES = new Date(HOY_M)
INICIO_MES.setDate(1)

const FINAL_MES = new Date(HOY_N)
FINAL_MES.setMonth(HOY_N.getMonth()+1)
FINAL_MES.setDate(0)

const INICIO_MES_ANTERIOR = new Date(HOY_M)
INICIO_MES_ANTERIOR.setDate(0)
INICIO_MES_ANTERIOR.setDate(1)

const FINAL_MES_ANTERIOR = new Date(HOY_N)
FINAL_MES_ANTERIOR.setDate(0)

const INICIO_ANHO = new Date(HOY_M)
INICIO_ANHO.setMonth(0)
INICIO_ANHO.setDate(1)

const FINAL_ANHO = new Date(HOY_N)
FINAL_ANHO.setMonth(11)
FINAL_ANHO.setDate(31)

const styles = theme => ({
  content: {
    padding: 25,
    paddingTop: 0,
    textAlign: "center"
  },
  boton:{
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    }
  },
  rangoActivo: {
    background: '#52a5f3 !important',
    color: '#FFF !important',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    }
  }
});

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

    const es = function(desdeP, hastaP){
      return (desde.getTime() == desdeP.getTime() ) && (hasta.getTime() == hastaP.getTime() )
    }

    return (
      <Dialog
        open={open}
        onClose={handleRangoFechas}>
        <DialogTitle>Rango de fechas</DialogTitle>
        <div className={classes.content}>
          <Button
            className={es(INICIO_MES,FINAL_MES) ? classes.rangoActivo : boton}
            disabled={es(INICIO_MES,FINAL_MES)}
            onClick={ () => {handleDateChange("desde", INICIO_MES); handleDateChange("hasta", FINAL_MES)} }>
            Mes Actual
          </Button>
          <Button
            className={es(INICIO_MES_ANTERIOR,FINAL_MES_ANTERIOR) ? classes.rangoActivo : boton}
            disabled={es(INICIO_MES_ANTERIOR,FINAL_MES_ANTERIOR)}
            onClick={ () => {handleDateChange("desde", INICIO_MES_ANTERIOR); handleDateChange("hasta", FINAL_MES_ANTERIOR)} }>
            Mes anterior
          </Button>
          <Button
            className={es(INICIO_MES_ANTERIOR,FINAL_MES) ? classes.rangoActivo : boton}
            disabled={es(INICIO_MES_ANTERIOR,FINAL_MES)}
            onClick={ () => {handleDateChange("desde", INICIO_MES_ANTERIOR); handleDateChange("hasta", FINAL_MES)} }>
            Desde el mes anterior
          </Button>
          <Button
            className={es(INICIO_ANHO,FINAL_ANHO) ? classes.rangoActivo : boton}
            disabled={es(INICIO_ANHO,FINAL_ANHO)}
            onClick={ () => {handleDateChange("desde", INICIO_ANHO); handleDateChange("hasta", FINAL_ANHO)} }>
            Todo el año
          </Button>
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