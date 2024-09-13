import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    fetch('https://localhost:7188/api/menus', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is the welcome page after login.</p>
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>parent id</th>
              <th>code</th>
              <th>name</th>
              <th>description</th>
              <th>actionby</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.parentId}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.actionBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}

      <button onClick={() => navigate('/SpinWheel')}>Go to Spin Wheel</button>

    </div>
  );
}

export default Welcome;
