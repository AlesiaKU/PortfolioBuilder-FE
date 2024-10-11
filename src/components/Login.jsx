import React, { useState } from 'react';
import '../styles/form.css'; // Импортируем CSS файл
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { RxExit } from "react-icons/rx";

function Login() {
  const navigate = useNavigate(); // Хук для навигации

  // Стейты для хранения данных формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = () => {
    navigate('/register'); // Переход на страницу регистрации
  };

  const handleExitClick = () => {
    // Перенаправление на главную страницу
    navigate('/');
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Отключаем стандартное поведение формы

    // Данные, которые будут отправлены на сервер
    const userData = { email, password };

    try {
      const response = await fetch('http://localhost:5000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Отправляем данные в формате JSON
      });

      // Обработка ответа от сервера
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data); // Выводим ответ сервера в консоль
        alert(`Success: ${data.message}`); // Показываем сообщение пользователю
      } else {
        console.error('Error:', response.statusText);
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
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
                onChange={(e) => setEmail(e.target.value)} // Обновляем стейт при вводе
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
                onChange={(e) => setPassword(e.target.value)} // Обновляем стейт при вводе
                required
              />
            </div>
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
