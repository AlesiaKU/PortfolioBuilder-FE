import React, { useState } from 'react';
import '../styles/profile.css'; 

function Profile() {
  const [activeSection, setActiveSection] = useState('portfolio'); // Установим начальное значение на 'portfolio'

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Содержимое для секции "Портфолио"
  const renderPortfolio = () => (
    <div>
      <p>Здесь вы можете увидеть ваши работы.</p>
      {/* Вы можете добавить больше элементов или форм здесь */}
    </div>
  );

  // Содержимое для секции "Проекты"
  const renderProjects = () => (
    <div>
      <p>Здесь можно увидеть детали ваших проектов.</p>
      {/* Добавьте формы или другую информацию */}
    </div>
  );

  // Содержимое для секции "Сообщения"
  const renderMessages = () => (
    <div>
      <p>Здесь находятся ваши сообщения.</p>
      {/* Добавьте элементы формы для отправки сообщений */}
    </div>
  );

  return (
    <div className='profile-page'>
      <div className='profileData'>
        <div className='basePofInfo'>
          <div className='profPhoto'></div>
          <p className='profName'>Alisa</p>
          <p className='profJob'>Designer</p>
          <div className='profPhone'>
            <label>
              Phone
              <input type="text" readOnly />
            </label>
          </div>
        </div>

        <div className='navegPage'>
          <nav className="profile_nav">
            <button 
              onClick={() => handleSectionChange('portfolio')}
              style={{ fontWeight: activeSection === 'portfolio' ? 'bold' : 'normal' }} // Условный стиль
            >
              Your portfolio
            </button>
            <button 
              onClick={() => handleSectionChange('projects')}
              style={{ fontWeight: activeSection === 'projects' ? 'bold' : 'normal' }} // Условный стиль
            >
              Your details
            </button>
            <button 
              onClick={() => handleSectionChange('messages')}
              style={{ fontWeight: activeSection === 'messages' ? 'bold' : 'normal' }} // Условный стиль
            >
              Messages
            </button>
          </nav>
          <div className='pageInProf'>
            {activeSection === 'portfolio' && renderPortfolio()}
            {activeSection === 'projects' && renderProjects()}
            {activeSection === 'messages' && renderMessages()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
