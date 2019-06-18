import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";

const styles = theme => ({
  root: {
    marginTop: 14
  },
  inputRoot: {

  }
});

class Fechas extends Component {

  render() {
    const { classes, style, id, fecha, minDate, minDateMessage, maxDate,
      maxDateMessage, handleDateChange, inputRoot, inputFecha, invalidDateMessage,
      adornmentPosition, disableFuture, variant, label, autoOk, keyboard, fullWidth,
      tipo
    } = this.props;

    const tipos = {
      fecha: {
        c: DatePicker,
        f: "dd/MM/yyyy",
        p: "10/10/2018",
      },
      fechaTeclado: {
        c: KeyboardDatePicker,
        f: "dd/MM/yyyy",
        p: "10/10/2018",
      },
      tiempo: {
        c: TimePicker,
        f: "HH:mm",
        p: "15:10",
      },
      tiempoTeclado: {
        c: KeyboardTimePicker,
        f: "HH:mm",
        p: "15:10",
      },
      fechaTiempo: {
        c: DateTimePicker,
        f: "dd/MM/yyyy HH:mm",
        p: "10/10/2018 15:10",
      },
      fechaTiempoTeclado: {
        c: KeyboardDateTimePicker,
        f: "dd/MM/yyyy HH:mm",
        p: "10/10/2018 15:10",
      }
    }

    const Component = !!tipo && !!tipos[tipo] ? tipos[tipo] : tipos["fechaTeclado"];

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <Component.c
          className={classes.root} 
          autoOk={autoOk}
          keyboard={keyboard}
          adornmentPosition={adornmentPosition}
          disableFuture={disableFuture}
          variant={variant}
          label={label}
          minDate={minDate}
          fullWidth={fullWidth === undefined ? true : fullWidth}
          minDateMessage={minDateMessage}
          maxDate={maxDate}
          maxDateMessage={maxDateMessage}
          invalidDateMessage={invalidDateMessage}
          style={style}
          value={!!fecha ? fecha : null}
          onChange={(date) => {
            handleDateChange(id, date)
          }}
          format={Component.f}
          placeholder={Component.p}
          onInputChange={e => {
            const v =e.target.value;
            const f = f.substring(3,6)+f.substring(0,3)+f.substring(6,10)
            console.log(f);
            (new Date(f)) != "Invalid Date" && handleDateChange(id, new Date(f))
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(Fechas);