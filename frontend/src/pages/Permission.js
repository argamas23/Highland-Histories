import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Permission.css';

const Permissions = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [verificationResult, setVerificationResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch("https://highlandhistories.org/api/requests/fetch");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPendingRequests(data.requests);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleVerify = async (index) => {
    const request = pendingRequests[index];
    try {
      const response = await fetch("https://highlandhistories.org/api/auth/createuser", {
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
        await fetch(`https://highlandhistories.org/api/requests/delete/${request._id}`, {
          method: 'DELETE',
        });
        localStorage.setItem('userId', json.userId);
      } else {
        setVerificationResult('Invalid credentials');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setVerificationResult('Error verifying user');
    }
  };

  const handleReject = async (index) => {
    const request = pendingRequests[index];
    try {
      const updatedRequests = pendingRequests.filter((_, i) => i !== index);
      setPendingRequests(updatedRequests);
      await fetch(`https://highlandhistories.org/api/requests/delete/${request._id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
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
