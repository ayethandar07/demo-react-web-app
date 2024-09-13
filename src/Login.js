import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('https://localhost:7188/api/auth/login', {
          username,
          password
        });

        console.log(response);

        // If the response contains access and refresh tokens, login is successful
        const { accessToken, refreshToken } = response.data;

        // Store tokens in local storage or session storage (depending on your requirement)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Set success message
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        
        // Redirect to the Welcome page
        navigate('/welcome');
      } 
      catch (error) {
        if (error.response && error.response.status === 400) 
        {
          setErrorMessage(error.response.data.message || 'Invalid credentials');
        } 
        else {
          setErrorMessage('Something went wrong. Please try again.');
        }
        setSuccessMessage('');
      }
    };

    return (
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
}

export default Login;
