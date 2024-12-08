import React, { useState, useEffect  } from 'react';
import '../styles/form.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import { log } from '../JavaScript/logger.js'; // Импорт логирования

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginClick = () => {
    log('INFO', 'User navigated to login page');
    navigate('/login');
  };

  // Извлечение почты из URL (игнорируем токен)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromLink = queryParams.get('email'); // Получаем только email
    if (emailFromLink) {
      setEmail(emailFromLink);
      setStep(2); // Переводим на второй шаг, если email есть
    }
  }, [location.search]);

  const handleExitClick = () => {
    navigate('/');
    log('INFO', 'User exited registration page');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Сбрасываем сообщение об успехе
    setErrorMessage(''); // Сбрасываем сообщение об ошибке

    // Преобразуем данные в формат application/x-www-form-urlencoded
    const bodyData = new URLSearchParams();
    bodyData.append('email', email);

    try {
      const response = await fetch('http://26.188.13.76:8080/api/users/send-verification-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyData.toString(), // отправляем данные как строку
      });

      console.log("Email being sent:", email);
      if (response.ok) {
        log('SUCCESS', 'Email verification link sent', { email });
        setSuccessMessage('Проверьте вашу почту для подтверждения');
        setStep(1); // Оставляем на первом этапе
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || 'Ошибка отправки письма';
        setErrorMessage(errorMsg);
        log('ERROR', 'Failed to send email verification link', errorData);
        navigate('/');
      }
    } catch (error) {
      log('ERROR', 'Unexpected error during email submission', error);
      setErrorMessage('Ошибка отправки письма');
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const error = 'Passwords do not match';
      setErrorMessage(error);
      log('ERROR', 'Password mismatch during registration', { email });
      return;
    }
    setErrorMessage(''); // Сбрасываем ошибку

    const userData = { email, password };
    log('INFO', 'Attempting user registration', userData);

    try {
      const response = await fetch('http://26.188.13.76:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        log('SUCCESS', 'User registered successfully', data);
        localStorage.setItem('token', token);
        console.log('JWT Token:', data.token); // Здесь предполагается, что токен возвращается в поле `token`
        alert(data.message || 'Данные успешно отправлены');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || 'Registration failed';
        setErrorMessage(errorMsg);
        log('ERROR', 'Registration failed', errorData);
      }
    } catch (error) {
      alert('Something went wrong');
      log('ERROR', 'Unexpected error during registration', error);
    }
  };

  const handlePasswordFocus = () => {
    setErrorMessage('');
  };
  return (
    <div className="register">
      <div className="formm">
        <div className="image-container"></div>
        <div className="container2">
          <RxExit className="exit-icon" onClick={handleExitClick} style={{ cursor: 'pointer' }} />
          {step === 1 ? (
          <form className="reglogform" onSubmit={handleEmailSubmit}>
            <h1>Welcome to Generator</h1>
            <div className="input-box">
              <label className="email">Email</label>
              <input type="email" placeholder="Enter your email" className="form-style"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

              <button type="submit" className="btn-form">Отправить</button>
              <div className="register-link">
              <p>Already have an account? <button type="button" className='slka' onClick={handleLoginClick}>Login</button></p>
            </div>
            </form>
          ) : (
            <form className="reglogform" onSubmit={handleSubmit}>
              <h1>Завершение регистрации</h1>
              <div className="input-box">
              <label className="email">Email</label>
              <input type="email" placeholder="Enter your email" className="form-style"
                value={email} disabled/>
            </div>
            <div className="input-box">
              <label className="password">Password</label>
              <input type="password" placeholder="Enter your password" className="form-style" value={password}
                onChange={(e) => setPassword(e.target.value)} onFocus={handlePasswordFocus}
                required
              />
            </div>
            <div className="input-box">
              <label className="password">Confirm Password</label>
              <input type="password" placeholder="Confirm your password" className="form-style" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} onFocus={handlePasswordFocus}
                required
              />
              {/* Отображение сообщения об ошибке */}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            <button type="submit" className="btn-form">Create Account</button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
