import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.genius.com/some_protected_endpoint', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default ProtectedComponent;
