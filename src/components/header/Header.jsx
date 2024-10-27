import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import './header.css';
import logo from './logo.svg';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  // Функция выхода из системы
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    navigate('/'); // Перенаправляем пользователя на главную страницу после выхода
  };

  return (
    <header className='header'>
      <div className="container">
        <div className="header_row">
          <div className="header_logo">
          <img src={logo} className="headerlogo" />
            <span>Your Portfolio</span>
          </div>

          <nav className="header_nav">
            <ul>
              <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">Home</Link></li>
              <div className='cherta'></div>
              <li className={location.pathname === '/generator' ? 'active' : ''}><Link to="/generator">Generator</Link></li>
              <div className='cherta'></div>
              <li className={location.pathname === '/faq' ? 'active' : ''}><Link to="/faq">FAQ</Link></li>
              <div className='cherta'></div>
              <li className={location.pathname === '/examples' ? 'active' : ''}><Link to="/examples" className="Examples">Examples</Link></li>
            </ul>
          </nav>

          <div className="headerbtn-lr">
            {isAuthenticated ? (
              <>
              <button onClick={handleLogout} className='btn-log'>
                  Log out
                </button>
                <Link to="/profile" className='iconProfile'>
                  <FaUserCircle size={28} /> {/* Иконка профиля */}
                </Link>
                
              </>
            ) : (
              <>
                <Link to="/login" className='btn-log'>Login</Link>
                <Link to="/register" className='btn-reg'>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;