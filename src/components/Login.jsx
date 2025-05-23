import React, { useState } from 'react';
import '../styles/form.css';
import { useNavigate } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import { FaGoogle, FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import MarqueeText from '../JavaScript/MarqueeText.js';

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

      // Проверяем наличие и корректность токена JWT
      if (data.jwt && data.jwt !== 'not ok') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', data.jwt); // Сохранение JWT
        localStorage.setItem('userEmail', email); // Сохраняем email
        console.log('JWT Token:', data.jwt); // Вывод токена в консоль
        navigate('/');
      } else {
        // Если токен отсутствует или равен "not ok", устанавливаем сообщение об ошибке
        setErrorMessage('Login failed: Invalid token received. Please check your credentials.');
        console.error('Error: Invalid JWT token received:', data.jwt);
      }
    } else if (response.status === 401) {
      setErrorMessage('Invalid email or password');
    } else {
      setErrorMessage('Login failed: Unexpected server response');
      console.error('Server response status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    setErrorMessage('Something went wrong. Please try again.');
  }
};
const handleGoogleLogin = (response) => {
  console.log('Google response:', response);
  // Отправить response для авторизации через сервер или использовать для авторизации через Google
};


  return (
    <div className="login">
      <div className="formm">
      <div className="image-container">
<MarqueeText text="PORTFOLIO READY!" reverse={false} />
<MarqueeText text="SHOW YOUR SKILLS!" reverse={true} />
<MarqueeText text="YES TO SUCCESS!" reverse={false} />
<MarqueeText text="NO LIMITS! SAY YES TO GROWTH!" reverse={true} />
<MarqueeText text="CV UPGRADED!" reverse={false} />
<MarqueeText text="YOU’VE GOT THIS!" reverse={true} />
<MarqueeText text="JUST START!" reverse={false} />
<MarqueeText text="SAY YES TO GROWTH!" reverse={true} />
<MarqueeText text="OWN YOUR JOURNEY!" reverse={false} />
<MarqueeText text="LEVEL UP NOW!" reverse={true} />
<MarqueeText text="PORTFOLIO READY!" reverse={false} />
<MarqueeText text="SHOW YOUR SKILLS!" reverse={true} />
<MarqueeText text="YES TO SUCCESS!" reverse={false} />
        </div>
        <div className="container2">
          <RxExit className="exit-icon" onClick={handleExitClick} style={{ cursor: 'pointer' }} />
          <form onSubmit={handleSubmit} className="reglogform">
            <div className="container2Form">
            <h1>Welcome to Generator</h1>
            <div className="input-box">
              <label className="email">Email</label>
              <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Enter your email" className="form-style"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            </div>
            <div className="input-box">
              <label className="password">Password</label>
              <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Enter your password" className="form-style" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Отображение сообщения об ошибке */}
            <button type="submit" className="btn-form">Login</button>



            <div className="register-link">
              <p>Don't have an account? <button type="button" className='slka' onClick={handleRegisterClick}>Register</button></p>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
