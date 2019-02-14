import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import esLocale from 'date-fns/locale/es';

const styles = theme => ({
  inputRoot: {

  }
});

class Fechas extends Component {

  render() {
    const { classes, styles, id, fecha, minDate, minDateMessage, maxDate, maxDateMessage, handleDateChange, inputRoot, inputFecha, invalidDateMessage } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <DatePicker
          keyboard
          clearable
          autoOk
          minDate={minDate}
          minDateMessage={minDateMessage}
          maxDate={maxDate}
          maxDateMessage={maxDateMessage}
          invalidDateMessage={invalidDateMessage}
          style={styles}
          format={"dd-MM-yyyy"}
          value={!!fecha ? fecha : null}
          onChange={(date) => handleDateChange(id, date)}
          InputProps={{
            error: !!!fecha || (new Date(fecha)).getTime() > (new Date()).getTime(),
            classes: {
              root: inputRoot,
              input: inputFecha,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(Fechas);