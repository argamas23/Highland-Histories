import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Permission.css';

const Permissions = () => {
  const [request, setRequest] = useState({ name: '', email: '', password: '', confirmPassword: '', usertype: '' });
  const [verificationResult, setVerificationResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRequest = localStorage.getItem('request');

    if (storedRequest) {
      try {
        setRequest(JSON.parse(storedRequest));
      } catch (error) {
        console.error('Error parsing stored request:', error);
        // Handle error gracefully, e.g., set default request or clear localStorage
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(request)
    });
    const json = await response.json();
    if (json.success) {
      setVerificationResult('User created successfully.');
      setRequest({ name: '', email: '', password: '', confirmPassword: '', usertype: '' }); // Reset form fields
      // Optionally, you can clear localStorage as well
      localStorage.setItem('userId', json.userId);
      localStorage.removeItem('request');
      // localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
      setVerificationResult('Invalid credentials');
    }
  }

  const handleReject = () => {
    localStorage.removeItem('request');
    setRequest({ name: '', email: '', password: '', confirmPassword: '', usertype: '' }); // Reset form fields
  }

  return (
    <div>
      <h2>Permissions</h2>
      <div>
        <p>Name: {request.name}</p>
        <p>Email: {request.email}</p>
        <p>User Type: {request.usertype}</p>
        <div className="button-container">
          <button onClick={handleSubmit} className="verify-btn">
            Verify
          </button>
          <button onClick={handleReject} className="reject-btn">
            Reject
          </button>
        </div>
        <p>{verificationResult}</p>
      </div>
    </div>
  );
};

export default Permissions;
