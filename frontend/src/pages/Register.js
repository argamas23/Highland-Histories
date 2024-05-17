import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import config from '../globals';

const Register = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '', usertype: '' }); // Include usertype in credentials
  const [formErrors, setFormErrors] = useState({});
  const [secretkey, setSecretKey] = useState('');
  let pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];

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
    setCredentials({ ...credentials, [name]: value }); // Update credentials with usertype

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
  if (credentials.usertype === 'Admin' && secretkey !== config.SECRET_KEY) {
    alert("Invalid Admin");
  }
  if (!validateForm()) return;
  const { name, email, password, usertype } = credentials;
  if (usertype === 'Admin' && secretkey === config.SECRET_KEY) {
    const response = await fetch("http://43.204.23.49/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ name, email, password, usertype })
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      navigate('/');
      localStorage.setItem('userId', json.userId)
      localStorage.setItem('user',credentials.usertype);
    } else {
      alert("Invalid credentials");
    }
  } if(credentials.usertype == 'User') {
    pendingRequests.push(credentials);
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));
    // localStorage.setItem('request', JSON.stringify(credentials));
    // console.log('here')
    alert("Please wait for Admin to approve")
    console.log(pendingRequests)
  }
  if(usertype == '') {
    alert('Please Select UserType');
  }
};

  const secretKey = (event) => {
    setSecretKey(event.target.value);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="radio"
            name="usertype"
            value="User"
            onChange={handleInputChange}
          />
          User
          <input
            type="radio"
            name="usertype"
            value="Admin"
            onChange={handleInputChange}
          />
          Admin
        </div>
        {credentials.usertype === "Admin" &&
          <div>
            <input
              type="text"
              name="secret-key"
              placeholder="Secret Key"
              value={secretkey}
              onChange={secretKey}
            />
          </div>
        }
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
