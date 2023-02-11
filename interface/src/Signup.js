import React, { useState } from 'react';
import './Form.css';
const validator = require('validator');

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation on form fields
    if (!validator.isEmail(email)) {
      alert('Invalid email address');
      return;
    }
    if (!validator.isMobilePhone(phone)) {
      alert('Invalid phone number');
      return;
    }
    if (name.length < 2 || name.length > 100) {
      alert('Name must be between 2 and 100 characters');
      return;
    }
    if (password.length < 8 || password.length > 100) {
      alert('Password must be between 8 and 100 characters');
      return;
    }
    if (address.length < 5 || address.length > 200) {
      alert('Address must be between 5 and 200 characters');
      return;
    }

    fetch('http://localhost:8080/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({'name': name, 'email': email, 'password': password, 'address': address, 'phone': phone})
  })
  .then(res => res.text())
  .then(msg =>{
    alert(msg);
    console.log(msg)
  })

    console.log('name:', name);
    console.log('email:', email);
    console.log('password:', password);
    console.log('address:', address);
    console.log('phone:', phone);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label  className="label">
        Name:
        <br />
        <input className="input-field" type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label className="label">
        Email:
        <br />
        <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br />
      <label className="label">
        Password:
        <br />
        <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <label className="label">
        Address:
        <br />
        <input className="input-field" type="text" value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <br />
      <label className="label">
        Phone:
        <br />
        <input className="input-field" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
      </label>
      <br />
      <button className="submit-button" type="submit">Signup</button>
    </form>
  );
}

export default Signup;
