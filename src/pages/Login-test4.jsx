import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/formatters';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, name: 'Test User' });
  };

  return React.createElement(Card, null,
    React.createElement('h1', null, 'Login'),
    React.createElement(Mail),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement(Input, {
        type: 'email',
        placeholder: 'Email',
        value: email,
        onChange: (e) => setEmail(e.target.value)
      }),
      React.createElement(Input, {
        type: 'password',
        placeholder: 'Password',
        value: password,
        onChange: (e) => setPassword(e.target.value)
      }),
      React.createElement(Button, { type: 'submit' }, 'Login')
    )
  );
};

export default Login;
