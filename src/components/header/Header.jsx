import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import './header.css';
import logo from './logo.svg';
import { FaUserCircle} from 'react-icons/fa';
import { CiGlobe } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import { log } from '../../JavaScript/logger.js'; 
import SearchBar from './SearchBar.jsx'

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();  // подключаем i18n

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
/*  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);*/

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Проверяем наличие токена
    log('INFO', 'Checked authentication status', { isAuthenticated: !!token });
  }, []);

  // Функция выхода из системы
  /*const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    navigate('/'); // Перенаправляем пользователя на главную страницу после выхода
  };*/

  const handleLogout = () => {
    log('INFO', 'User logged out'); 
    localStorage.removeItem('token'); // Удаляем токен
    setIsAuthenticated(false);
    navigate('/'); // Перенаправляем пользователя на главную страницу
  };

  // Функция переключения языка
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    log('INFO', 'Language toggled', { from: language, to: newLanguage });
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);  // Переключаем язык
  };

   // Функция для логирования переходов по навигации
   const handleNavigation = (path) => {
    log('USER_ACTION', 'User navigated', { from: location.pathname, to: path });
    navigate(path);
  };


  return (
    <header className='header'>
      <div className="container">
        <div className="header_row">
          <div className="header_logo">
          <img src={logo} className="headerlogo" />
            <span>{t('header.title')}</span>
          </div>
          <div className="header_search">
  <SearchBar />
</div>

          <nav className="header_nav">
            <ul>
              <li className={location.pathname === '/' ? 'active' : ''}><Link to="/" className="headerBtn" onClick={() => handleNavigation('home')}>{t('header.home')}</Link></li>
              <div className='cherta'></div>
              <li className={location.pathname === '/generator' ? 'active' : ''}><Link to="/generator" className="headerBtn" onClick={() => handleNavigation('generator')}>{t('header.generator')}</Link></li>
              <div className='cherta'></div>
              <li className={location.pathname === '/faq' ? 'active' : ''}><Link to="/faq" className="headerBtn" onClick={() => handleNavigation('faq')}>{t('header.faq')}</Link></li>
              <div className='cherta'></div>
              <li className={location.pathname === '/examples' ? 'active' : ''}><Link to="/examples" className="headerBtn" onClick={() => handleNavigation('examples')}>{t('header.examples')}</Link></li>
            </ul>
          </nav>

          <div className="headerbtn-lr">
            {/* Кнопка переключения языка */}
            <button onClick={toggleLanguage} className="languageToggle">
              <CiGlobe size={25} />
              <span className="languageLabel">{language.toUpperCase()}</span>
            </button>
            {isAuthenticated ? (
              <>
              <button onClick={handleLogout} className='btn-log'>
                {t('header.logOutBtn')}
                </button>
                <Link to="/profile" className='iconProfile' onClick={() => handleNavigation('profile')}>
                  <FaUserCircle size={28} /> {/* Иконка профиля */}
                </Link>
                
              </>
            ) : (
              <>
                <Link to="/login" className='btn-log'>{t('header.loginBtn')}</Link>
                <Link to="/register" className='btn-reg'>{t('header.registerBtn')}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;