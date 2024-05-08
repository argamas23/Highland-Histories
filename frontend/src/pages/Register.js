// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { loggedin } from '../globals';

const Register = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length >= 3;
      case 'email':
        return /\S+@\S+\.\S+/.test(value);
      case 'password':
        return value.length >= 8;
      case 'confirmPassword':
        return value === credentials.password;
      default:
        return true;
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });

    if (formErrors[name] && validateField(name, value)) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!validateField('name', credentials.name)) errors.name = 'Name must be at least 3 characters';
    if (!validateField('email', credentials.email)) errors.email = 'Email address is invalid';
    if (!validateField('password', credentials.password)) errors.password = 'Password must be at least 8 characters';
    if (!validateField('confirmPassword', credentials.confirmPassword)) errors.confirmPassword = 'Passwords do not match';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={credentials.name}
            onChange={handleInputChange}
            required
          />
          {formErrors.name && <p>{formErrors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
          {formErrors.email && <p>{formErrors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          {formErrors.password && <p>{formErrors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
