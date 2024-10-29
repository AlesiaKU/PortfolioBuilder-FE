import React, { useState } from 'react';
import '../styles/form.css'; 
import { useNavigate } from 'react-router-dom';
import { RxExit } from "react-icons/rx";

function Login() {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  const handleExitClick = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const userData = { email, password };
    console.log('Sending user data to API:', userData);
    try {
      const response = await fetch('http://26.188.13.76:8080/api/users', {
        method: 'POST',
       // method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'same-origin' 
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Login successful');
        navigate('/');
      } else if (response.status === 401) {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login">
      <div className="formm">
        <div className="image-container"></div>
        <div className="container2">
          <RxExit className="exit-icon" onClick={handleExitClick} style={{ cursor: 'pointer' }} />
          <form onSubmit={handleSubmit} className="reglogform">
            <h1>Welcome to Generator</h1>
            <div className="input-box">
              <label className="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-style"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="input-box">
              <label className="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            {errorMessage && <p style={{ color: 'red'}}>{errorMessage}</p>} {/* Отображение сообщения об ошибке */}
            <button type="submit" className="btn-form">Login</button>

            <div className="register-link">
              <p>Don't have an account? <button type="button" className='slka' onClick={handleRegisterClick}>Register</button></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
