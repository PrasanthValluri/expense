import React, { useState, useEffect, useContext, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { InputText } from './common/Input';
import { emailValid } from '../utils/format';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { white } from 'colors';
import person from './person.png';
import "../App.css";

const useStyles = makeStyles((theme) => ({
  
  centerAlign: {
    
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 48px)',
    },
    height: 'calc(100vh - 104px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: white,
  },
  alert: { 
    width: '100%', 
    borderRadius: 0, 
  },
}));

const Profile = () => {
  const { users, loadUser, updateUser } = useContext(GlobalContext);
  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [date, setDate] = useState('');
  const [errorName, setErrorName] = useState(false),
        [errorEmail, setErrorEmail] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true),
        [disableCancel, setDisableCancel] = useState(true);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  const itemValid = (item, errorItem) => {
    if (!item) setDisableBtn(true);
    else errorItem ? setDisableBtn(true) : setDisableBtn(false);
  };

  const handleName = useCallback(
    ({ target: input }) => {
      setSuccess(false);
      setDisableCancel(false);
      setName(input.value);

      if (input.value.length >= 3) {
        setErrorName(false);
        itemValid(email, errorEmail);
      } else {
        setErrorName(true);
        setDisableBtn(true);
      }
    }, [email, errorEmail]
  );

  const handleEmail = useCallback(
    ({ target: input }) => {
      setSuccess(false);
      setDisableCancel(false);
      setEmail(input.value);

      if (emailValid(input.value)) {
        setErrorEmail(false);
        itemValid(name, errorName);
      } else {
        setErrorEmail(true);
        setDisableBtn(true);
      }
    }, [name, errorName]
  );
   
  
  const lists = [
    { label: 'Name', value: name, error: errorName, onChange: handleName },
    { label: 'Email', value: email, error: errorEmail, onChange: handleEmail },
    { label: 'Register Date', value: date, error: null, onChange: null },
  ];

  const errorMessage = (label) =>
    `Please enter valid ${label === 'Name' ? label + '(at least 3 characters)' : label}`;

  const buttons = [
    { text: 'SAVE', state: disableBtn },
    { text: 'CANCEL', state: disableCancel },
  ];

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.target.innerText;

      if (type === 'CANCEL') {
        const { name, email } = users.user;
        setName(name);
        setEmail(email);
      }
      if (type === 'SAVE') {
        const editUser = { name, email };
        updateUser(users.user._id, editUser);
        setSuccess(users.success);
      }
      setErrorName(false);
      setErrorEmail(false);
      setDisableBtn(true);
      setDisableCancel(true);
    },
    [users, name, email, updateUser]
  );

  const handleAlert = useCallback(() => {
    setSuccess(false);
  }, []);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (users.user) {
      const { name, email, register_date } = users.user;
      setName(name);
      setEmail(email);
      setDate(moment(register_date).format('d MMM, YYYY'));
    }
  }, [users.user]);

  return (
    <div className={classes.centerAlign}>
      {success ? (
        <Alert className={classes.alert} severity='success' onClose={handleAlert}>
          <p>Profile updated successfully!</p>
        </Alert>
      ) : <div style={{ height: 48 }} />}
      <img className='profile-picture' src={person} alt="profile"/>
      <form className='new-form' noValidate>
        {lists.map(({ label, value, error, onChange }) => (
          <InputText className="profile-lable"
          style={{ margin:'20px' }}
            key={label}
            label={label}
            value={value || ''}
            error={error}
            errorMsg={errorMessage(label)}
            onChange={onChange}
          />
        ))}

        {buttons.map(({ text, state }, index) => (
          <button
            key={text}
            className='btn plus-bg'
            style={{ margin: !index && '20px' }}
            disabled={state ? true : false}
            onClick={handleClick}
          >
            {text}
          </button>
          
        ))}
      </form>
    </div>
  );
};

export default Profile;