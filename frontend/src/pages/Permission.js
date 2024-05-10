import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h2>Permissions</h2>
      <div>
        <p>Request:</p>
        <pre>{JSON.stringify(request, null, 2)}</pre> {/* Use pre tag for JSON output */}
        <button onClick={handleSubmit}>Verify</button>
        <p>{verificationResult}</p>
      </div>
    </div>
  );
};

export default Permissions;
