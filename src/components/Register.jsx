// Register.jsx
import React,{ useState} from 'react';
import '../styles/form.css'; // Импортируем CSS файл
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { RxExit } from "react-icons/rx";

function Register() {
  const navigate = useNavigate(); // Хук для навигации

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginClick = () => {
    navigate('/login'); // Переход на страницу логина
  };

  const handleExitClick = () => {
    // Перенаправление на главную страницу
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Отключаем стандартное поведение формы

    // Проверка совпадения паролей
   /* if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }*/

    // Данные, которые будут отправлены на сервер
    const userData = { email, password, confirmPassword };
    
    console.log('Sending user data to API:', userData);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
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
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="register">
      <div className="formm">
        <div className="image-container"></div>
        <div className="container2">
          <RxExit className="exit-icon" onClick={handleExitClick} style={{ cursor: 'pointer' }} />
          <form className="reglogform">
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
              <input type="password" placeholder="Enter your password" className="form-style" value={password} // Используем состояние для ввода
                onChange={(e) => setPassword(e.target.value)} // Обновляем стейт при вводе
                required
              />
            </div>
            <div className="input-box">
              <label className="password">Confirm Password</label>
              <input type="password" placeholder="Enter your password" className="form-style"  value={confirmPassword} // Используем состояние для ввода
                onChange={(e) => setConfirmPassword(e.target.value)} // Обновляем стейт при вводе
                required
              />
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
