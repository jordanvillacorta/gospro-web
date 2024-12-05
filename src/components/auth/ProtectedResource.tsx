import React, { useState } from 'react';
import axios from 'axios';

const ProtectedResource = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  const handleFetchResource = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage

    try {
      const response = await axios.get('/protected-resource', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error fetching resource');
    }
  };

  return (
    <div>
      <h2>Protected Resource</h2>
      <button onClick={handleFetchResource}>Fetch Resource</button>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ProtectedResource;
