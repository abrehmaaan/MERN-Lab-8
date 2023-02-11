import React, { useState } from 'react';
import './Form.css';
const validator = require('validator');

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation on form fields
    if (!validator.isEmail(email)) {
      alert('Invalid email address');
      return;
    }
    if (password.length < 8 || password.length > 100) {
      alert('Password must be between 8 and 100 characters');
      return;
    }

    fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({'email': email, 'password': password})
  })
  .then(res => res.text())
  .then(msg =>{
    alert(msg);
    console.log(msg)
  })

    console.log('email:', email);
    console.log('password:', password);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="label" >
        Email:
        <br />
        <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br />
      <label className="label" >
        Password:
        <br />
        <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <button className="submit-button" type="submit">Login</button>
    </form>
  );
}

export default Login;
