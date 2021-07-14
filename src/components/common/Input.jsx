import React, { useRef, useCallback } from 'react';
import { TextField, InputAdornment, Switch } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: '#f5f2f0',
    opacity: 0.8,
  },
  input: {
    fontSize: '36px',
    paddingRight:"20px",
  },
  inputPlus: {
    color: '#f9813a',
  },
  inputMinus: {
    color: '#f9813a',
  },
}));

export const InputAmount = ({
  action,
  minus,
  amount,
  errorAmount,
  handleAmount,
  handleMinus,
}) => {
  const classes = useStyles();
  const ref = useRef();

  const handleFocus = useCallback(() => {
    ref.current.focus();
  }, [])

  const TransactionSwitch = withStyles((theme) => ({
    root: {
      marginRight: -12,
    },
    switchBase: {
      color: '#f9813a',
      '&$checked': {
        color: '#f9813a',
      },
      '&$checked + $track': {
        backgroundColor: '#f9813a',
      },
    },
    thumb: {
      boxShadow: 'none',
    },
    checked: {},
    track: {
      backgroundColor: '#f9813a',
    },
  }))(Switch);

  return (
    <div className='input-amount1'>
      <div className="toggle-btn">
        <p>Add Income</p>
      <TransactionSwitch
        checked={minus}
        tabIndex='-1'
        onChange={handleMinus}
        onClick={handleFocus}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <p>Add Expense</p>
      </div>
      <TextField
        id='amount'
        inputRef={ref}
        label='Amount'
        required
        autoFocus={action === 'new' && true}
        value={amount || ''}
        InputProps={{
          className: `${classes.input} ${
            minus ? classes.inputMinus : classes.inputPlus
          }`,
          startAdornment: (
            <InputAdornment position='start' style={{ margin: 0 }}>
              {minus ? <RemoveIcon /> : <AddIcon />}
            </InputAdornment>
          ),
        }}
        error={errorAmount}
        helperText={errorAmount
          ? 'Please enter a valid number'
          : 'Toggle Income / Expense'
        }
        onChange={handleAmount}
      />
    </div>
    
  );
};

export const InputText = ({ label, value, error, errorMsg, onChange }) => {
  const classes = useStyles();

  return (
    <TextField
      id={label}
      label={label}
      fullWidth
      value={value}
      error={error}
      required={label !== 'Register Date' && true}
      InputLabelProps={{ shrink: true }}
      InputProps={{ className: classes.textColor }}
      helperText={error && errorMsg}
      onChange={onChange}
      disabled={!onChange && true}
    />
  );
};

export const InputDate = ({ date, handleDate }) => {
  const classes = useStyles();
  const dateFormat = 'dd MMM, yyyy';
  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, dateFormat, { locale: this.locale });
    }
  }
  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils}>
      <KeyboardDatePicker 
        id='date'
        label='Date'
        value={date}
        format={dateFormat}
        onChange={handleDate}
        InputProps={{ className: classes.textColor }}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};