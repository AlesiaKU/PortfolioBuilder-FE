import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const location = useLocation();

  return (
    <header className='header'>
      <div className="container">
        <div className="header_row">
          <div className="header_logo">
            Logo
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
          <Link to="/login" className='btn-log'>Login</Link>
          <Link to="/register" className='btn-reg'>Register</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;