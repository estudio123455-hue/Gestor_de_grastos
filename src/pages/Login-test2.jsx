import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/formatters';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, name: 'Test User' });
  };

  return React.createElement('div', null,
    React.createElement('h1', null, 'Login'),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('input', {
        type: 'email',
        placeholder: 'Email',
        value: email,
        onChange: (e) => setEmail(e.target.value)
      }),
      React.createElement('input', {
        type: 'password',
        placeholder: 'Password',
        value: password,
        onChange: (e) => setPassword(e.target.value)
      }),
      React.createElement('button', { type: 'submit' }, 'Login')
    )
  );
};

export default Login;
