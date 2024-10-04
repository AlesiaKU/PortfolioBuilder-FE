// Register.jsx
import React from 'react';
import '../styles/form.css'; // Импортируем CSS файл
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { RxExit } from "react-icons/rx";

function Register() {
  const navigate = useNavigate(); // Хук для навигации

  const handleLoginClick = () => {
    navigate('/login'); // Переход на страницу логина
  };

  const handleExitClick = () => {
    // Перенаправление на главную страницу
    navigate('/');
  };

  return (
    <div className="register">
      <div className="formm">
        <div className="image-container"></div>
        <div className="container2">
          <RxExit className="exit-icon" onClick={handleExitClick} style={{ cursor: 'pointer' }} />
          <form>
            <h1>Welcome to Generator</h1>
            <div className="input-box" id="name">
              <label className="name">Nickname</label>
              <input type="text" placeholder="Enter your name" className="form-style" required />
            </div>
            <div className="input-box">
              <label className="password">Password</label>
              <input type="password" placeholder="Enter your password" className="form-style" required />
            </div>
            <div className="input-box">
              <label className="password">Confirm Password</label>
              <input type="password" placeholder="Enter your password" className="form-style" required />
            </div>
            <button type="submit" className="btn-form">Create Account</button>

            <div className="register-link">
              <p>Already have an account? <button type="button" className='slka' onClick={handleLoginClick}>Login</button></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
