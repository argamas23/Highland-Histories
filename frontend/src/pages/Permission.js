import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Permission.css';

const Permissions = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [verificationResult, setVerificationResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRequests = localStorage.getItem('pendingRequests');

    if (storedRequests) {
      try {
        setPendingRequests(JSON.parse(storedRequests));
      } catch (error) {
        console.error('Error parsing stored requests:', error);
        // Handle error gracefully, e.g., set default pendingRequests or clear localStorage
      }
    }
  }, []);

  const handleVerify = async (index) => {
    
    const request = pendingRequests[index];
    
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
      const updatedRequests = pendingRequests.filter((_, i) => i !== index);
      setPendingRequests(updatedRequests);
      localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
      localStorage.setItem('userId', json.userId);
      // Optionally, you can clear localStorage for the individual request
      // localStorage.setItem('token', json.authtoken);
      // navigate('/');
    } else {
      setVerificationResult('Invalid credentials');
    }
  };

  const handleReject = (index) => {
    const updatedRequests = pendingRequests.filter((_, i) => i !== index);
    setPendingRequests(updatedRequests);
    localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
  };

  return (
    <div>
      <h1>Permissions</h1>
      {pendingRequests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        pendingRequests.map((request, index) => (
          <div key={index} className="request-item">
            <p>Name: {request.name}</p>
            <p>Email: {request.email}</p>
            <p>User Type: {request.usertype}</p>
            <div className="button-container">
              <button onClick={() => handleVerify(index)} className="verify-btn">
                Verify
              </button>
              <button onClick={() => handleReject(index)} className="reject-btn">
                Reject
              </button>
            </div>
          </div>
        ))
      )}
      <p>{verificationResult}</p>
    </div>
  );
};

export default Permissions;
