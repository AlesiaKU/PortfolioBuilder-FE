import React, { useState, useEffect } from 'react';
import '../styles/PortfolioPage.css';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BsTelephoneOutbound } from "react-icons/bs";
import { LiaCitySolid } from "react-icons/lia";
import myImage from '../img/funny-klev-club-7ved-p-smeshnie-kartinki-avatarki-net-21.jpg'; // Импортируем изображение
import jsPDF from 'jspdf'; // Импорт библиотеки jsPDF
import html2canvas from 'html2canvas'; // Для захвата содержимого как изображения

// Функция для извлечения email из токена
const extractEmailFromToken = () => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем payload токена
    return payload.sub; // Извлекаем email
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
};

const PortfolioPage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0); // Добавлено состояние для индекса портфолио

  const fetchPortfolioData = async () => {
    const email = extractEmailFromToken();
    if (!email) {
      console.error('Email не найден в токене');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://26.188.13.76:8080/api/portfolios?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      setPortfolioData(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!portfolioData) {
    return <div>Данные не найдены</div>;
  }

  const switchPortfolio = (direction) => {
    setCurrentPortfolioIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      // Логика для циклического переключения
      if (newIndex < 0) return 0; // Не даем уйти в минус
      return newIndex; // Возвращаем новый индекс
    });
  };

  const downloadPortfolioAsPDF = async () => {
    const element = document.querySelector('.portfolio-content'); // Контейнер для захвата
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('portfolio.pdf');
  };

  return (
    <div className={`portfolio-container`}>
      <div className="portfolio-nav-buttons">
        <button onClick={() => switchPortfolio(-1)}>&lt; Назад</button>
        <button onClick={downloadPortfolioAsPDF}>Скачать</button>
        <button onClick={() => switchPortfolio(1)}>Вперед &gt;</button>
      </div>

      <div className="portfolio-content">
        <div className="profile-section">
          <div className='portRect'>
            <h1>
            {portfolioData.firstName || 'Имя по умолчанию'} {portfolioData.lastName || ''}
            </h1>
          </div>
          <div className="info-container">
          <div className="profile-image">
              {/* Используем строку Base64, если она есть */}
              {portfolioData.photo ? (
                <img src={`data:image/jpeg;base64,${portfolioData.photo}`} alt="Profile" />
              ) : (
                <img src={myImage} alt="Profile" />
              )}
            </div>
            <div className="profile-details">
              <p className='portEmail'><strong><MdOutlineMarkEmailRead /></strong> {portfolioData.email || 'Не указано'}</p>
              <p className='portPhon'><strong><BsTelephoneOutbound /></strong> {portfolioData.phoneNumber || 'Не указано'}</p>
              <p className='portCity'><strong><LiaCitySolid /></strong> {portfolioData.country || 'Не указано'}</p>
            </div>
            <div className="section3">
              <h3>Languages</h3>
              <ul className="languages-list">
  {portfolioData.languages?.map((languageObj, index) => (
    <li key={index}>
      {languageObj.language} ({languageObj.level || 'Не указано'})
    </li>
  ))}
</ul>

            </div>
            <div className="section-employment">
              <h3>Тип занятости</h3>
              <p>{portfolioData.employment || 'Не указано'}</p>
            </div>
            <div className="section-work-mode">
              <h3>Режим работы</h3>
              <p>{portfolioData.workMode || 'Не указано'}</p>
            </div>
            <div className="section-businessTrips">
              <h3>Командировки</h3>
              <p>{portfolioData.businessTrips || 'Не указано'}</p>
            </div>
          </div>
        </div>
        <div className="info-sections">
          <div className="section">
            <h3>О себе</h3>
            <p>{portfolioData.header || 'Не указано'}</p>
          </div>
          <div className="section1">
            <h3>Образование</h3>
            {portfolioData.educations && portfolioData.educations.length > 0 ? (
            portfolioData.educations.map((edu, index) => (
              <div key={index}>
                <p>
                  <strong>{edu.specialization}</strong> - {edu.institution} ({edu.startDate} - {edu.endDate})
                </p>
                </div>
              ))
            ) : (
              <p>Образование не указано</p>
            )}
          </div>
          <div className="section0">
            <h3>Опыт работы</h3>
            {portfolioData.works && portfolioData.works.length > 0 ? (
            portfolioData.works.map((work, index) => (
              <div key={index}>
                <p><strong>{work.company}</strong> - {work.position} ({work.startDate} - {work.endDate})</p>
                <p>{work.jobsInfo}</p>
              </div>
            ))
          ) : (
            <p>Опыт работы не указан</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;