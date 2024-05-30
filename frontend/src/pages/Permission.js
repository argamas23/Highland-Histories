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
        console.log("Here");
        console.log('Response status:', response.status);
        console.log('Response content-type:', response.headers.get("content-type"));
  
        const text = await response.text();
        console.log('Raw response:', text);
        // console.log(response.ok);
        if (response.ok ) {
          const data = JSON.parse(text);
          setPendingRequests(data.requests);
        } else {
          throw new Error(`Unexpected response: ${text}`);
        }
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
