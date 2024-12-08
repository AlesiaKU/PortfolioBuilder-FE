import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { log } from '../JavaScript/logger.js'; // Импорт логирования

function VerifyEmailPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://26.188.13.76:8080/api/users/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        log('SUCCESS', 'Email verification link sent', { email });
        setSuccessMessage('Проверьте вашу почту для подтверждения');
        navigate(`/register?email=${email}`);
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || 'Ошибка отправки письма';
        setErrorMessage(errorMsg);
        log('ERROR', 'Failed to send email verification link', errorData);
      }
    } catch (error) {
      log('ERROR', 'Unexpected error during email submission', error);
      setErrorMessage('Ошибка отправки письма');
    }
  };

  return (
    <div className="verify-email-page">
      <h1>Подтвердите ваш email</h1>
      <form onSubmit={handleEmailSubmit}>
        <div className="input-box">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Введите ваш email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default VerifyEmailPage;

