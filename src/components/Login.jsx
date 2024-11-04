import React, { useState } from 'react';
import '../styles/form.css';
import { useNavigate } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import { FaGoogle, FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';

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

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    console.log('Sending user data to API:', userData);
    try {
      const response = await fetch('http://26.188.13.76:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'same-origin'
      });

      if (response.ok) {
        // Попробуем сначала прочитать ответ как JSON
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          // Если ответ не является JSON, считаем его обычным текстом
          data = await response.text();
        }

        if (data.jwt) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('jwt', data.jwt); // Сохранение JWT
          console.log('Login successful');
          navigate('/');
        } else {
          setErrorMessage('Unexpected response format');
          console.error('Error: Expected JWT token in response, got:', data);
        }
      } else if (response.status === 401) {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = { email, password };
    console.log('Sending user data to API:', userData);
    try {
      const response = await fetch('http://26.188.13.76:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'same-origin'
      });
  
      if (response.ok) {
        let data;
  
        // Проверяем тип содержимого ответа
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json(); // Читаем как JSON, если тип JSON
        } else {
          data = { jwt: await response.text() }; // Читаем как текст и оборачиваем в объект для сохранения в data.jwt
        }
  
        if (data.jwt) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('jwt', data.jwt); // Сохранение JWT
          console.log('Login successful');
          console.log('JWT Token:', data.jwt); // Вывод токена в консоль
          navigate('/');
        } else {
          setErrorMessage('Unexpected response format');
          console.error('Error: Expected JWT token in response, got:', data);
        }
      } else if (response.status === 401) {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = socialAuthUrls[provider];
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
              <input type="email" placeholder="Enter your email" className="form-style"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-box">
              <label className="password">Password</label>
              <input type="password" placeholder="Enter your password" className="form-style" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Отображение сообщения об ошибке */}
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
