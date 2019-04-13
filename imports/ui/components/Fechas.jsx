import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import esLocale from 'date-fns/locale/es';

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
      adornmentPosition, disableFuture, variant, label, autoOk, keyboard
     } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <DatePicker
          className={classes.root} 
          autoOk={autoOk}
          keyboard={keyboard}
          adornmentPosition={adornmentPosition}
          disableFuture={disableFuture}
          variant={variant}
          label={label}
          minDate={minDate}
          minDateMessage={minDateMessage}
          maxDate={maxDate}
          maxDateMessage={maxDateMessage}
          invalidDateMessage={invalidDateMessage}
          style={style}
          format={"dd/MM/yyyy"}
          placeholder="10/10/2018"
          mask={value =>
            // handle clearing outside if value can be changed outside of the component
            value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []
          }
          value={!!fecha ? fecha : null}
          onChange={(date) => {
            handleDateChange(id, date)
          }}
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