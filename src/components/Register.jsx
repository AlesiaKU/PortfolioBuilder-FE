import React, { useState, useEffect  } from 'react';
import '../styles/form.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import { log } from '../JavaScript/logger.js'; // Импорт логирования
import { FaEnvelope, FaLock } from 'react-icons/fa';
import MarqueeText from '../JavaScript/MarqueeText.js';

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
        setErrorMessage('Ошибка отправки письма');
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
        const token = data.token; // Извлекаем токен из ответа
        localStorage.setItem('token', token); // Сохраняем токен
        console.log('JWT Token:', token); // Логируем токен
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
<MarqueeText text="NO LIMITS! SAY YES TO GROWTH!" reverse={true} />
        </div>
        <div className="container2">
          <RxExit className="exit-icon" onClick={handleExitClick} style={{ cursor: 'pointer' }} />
          {step === 1 ? (
          <form className="reglogform" onSubmit={handleEmailSubmit}>
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
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

              <button type="submit" className="btn-form">Register</button>
              <div className="register-link">
              <p>Already have an account? <button type="button" className='slka' onClick={handleLoginClick}>Login</button></p>
            </div>
            </div>
            </form>
          ) : (
            <form className="reglogform" onSubmit={handleSubmit}>
              <h1>Completing registration</h1>
              <div className="input-box">
              <label className="email"></label>
              <input type="email" placeholder="Enter your email" className="form-style"
                value={email} disabled/>
            </div>
            <div className="input-box">
              <label className="password"></label>
              <input type="password" placeholder="Enter your password" className="form-style" value={password}
                onChange={(e) => setPassword(e.target.value)} onFocus={handlePasswordFocus}
                required
              />
            </div>
            <div className="input-box">
              <label className="password"></label>
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
