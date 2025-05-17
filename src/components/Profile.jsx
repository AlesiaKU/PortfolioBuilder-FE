import React, { useState, useEffect, useRef } from 'react';
import '../styles/profile.css'; 
import Photo from '../img/27685d3c5ffe8936e872afffa3ed6625.jpg'
import pdfFile from '../img/portfolio.pdf';



function Profile() {
  const [activeSection, setActiveSection] = useState('portfolio'); // Установим начальное значение на 'portfolio'
  const [username, setUsername] = useState(''); // Состояние для хранения почты
const [userDetails, setUserDetails] = useState({
  email: 'lesiakuharchuk@gmail.com',
  firstName: 'Леся',
  lastName: 'Кухарчук',
  desiredPosition: 'Frontend Developer',
  country: 'Беларусь',
  phone: '+375291523359',
  gender: 'Женский',
  businessTrips: 'Готов к командировкам',
  employment: 'Полная занятость',
  workMode: 'Удаленно',
  works: [
    {
      position: 'Разработчик',
      company: 'Компания X',
      city: 'Минск',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      jobsInfo: 'Разработка веб-приложений'
    }
  ],
  educations: [
    {
      specialization: 'Информатика',
      institution: 'БГУ',
      city: 'Минск',
      startDate: '2015-09-01',
      endDate: '2019-06-01',
      educationInfo: 'Бакалавр информационных технологий'
    }
  ],
  languages: [
    {
      language: 'Английский',
      level: '4'
    }
  ]
});


  const removeLastWork = () => {
    if (userDetails.works.length > 0) {
      setUserDetails(prev => ({
        ...prev,
        works: prev.works.slice(0, -1)
      }));
    }
  };
  
  const removeLastEducation = () => {
    if (userDetails.educations.length > 0) {
      setUserDetails(prev => ({
        ...prev,
        educations: prev.educations.slice(0, -1)
      }));
    }
  };
  
  const removeLastLanguage = () => {
    if (userDetails.languages.length > 0) {
      setUserDetails(prev => ({
        ...prev,
        languages: prev.languages.slice(0, -1)
      }));
    }
  };
  
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  
  const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);
    const userId = useRef(Date.now() + Math.random().toString());

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('JWT Token:', token); // Вывод самого токена
        try {
          const payload = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));
          console.log('Decoded token payload:', decodedPayload);
          
          // Извлечение почты и получение имени пользователя до '@'
          const email = decodedPayload.sub; 
          setUsername(email.split('@')[0]); // Установка имени пользователя
        } catch (error) {
          console.error('Ошибка при декодировании токена:', error);
        }
      }

        // Подключаемся к WebSocket-серверу
        ws.current = new WebSocket('ws:http://26.188.13.76:8080');

        // Обработка входящих сообщений
        ws.current.onmessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data); // Парсим JSON
                console.log("Received message from server:", parsedData); // Логгирование полученного сообщения
            
                // Проверяем, что получено правильное сообщение
                if (parsedData.type === 'message') {
                    const messageData = parsedData.data; // Это сообщение, отправленное клиентом
                    
                    // Проверяем, что сообщение не пустое и является объектом
                    if (messageData && messageData.text) {
                        setMessages(prevMessages => [...prevMessages, messageData]); // Добавляем текст сообщения
                    } else {
                        console.error("Получено пустое сообщение:", messageData);
                    }
                }
            } catch (error) {
                console.error("Ошибка при разборе сообщения:", error);
            }
        };

        // Очистка при закрытии WebSocket
        return () => ws.current.close();
    }, []);

    // Отправка сообщения на сервер
    const sendMessage = () => {
        if (input.trim()) {
            const message = {
                id: Date.now(),
                userId: userId.current,
                text: input,
            };
            ws.current.send(JSON.stringify(message)); // Отправляем сообщение в формате JSON
            setMessages(prevMessages => [...prevMessages, message]); // Добавляем сообщение в свой список сообщений
            setInput(''); // Очищаем поле ввода
        }
    };

    const deleteProfile = () => {
      const confirmation = window.confirm('Вы уверены, что хотите удалить профиль?');
      if (confirmation) {
        // Логика удаления профиля (может быть вызов API)
        console.log('Профиль удален');
      }
    };


    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileMessage = {
            id: Date.now(),
            userId: userId.current,
            file: {
              name: file.name,
              type: file.type,
              content: reader.result, // Base64 контент файла
            },
          };
          // Отправка файла через WebSocket
          ws.current.send(JSON.stringify({ type: 'file', data: fileMessage }));
          setMessages((prevMessages) => [...prevMessages, fileMessage]); // Добавляем сообщение с файлом
        };
        reader.readAsDataURL(file); // Читаем файл как Base64
      }
    };
    

    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const response = await fetch('https://your-api-endpoint.com/user/details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserDetails({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          desiredPosition: data.desiredPosition || '',
          country: data.country || '',
          phone: data.phone || '',
          gender: data.gender || '',
          businessTrips: data.businessTrips || '',
          employment: data.employment || '',
          workMode: data.workMode || ''
        });
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };
    

  // ======= Обработчики для полей работы, образования, языков =======
  const handleWorkChange = (index, field, value) => {
    const updatedWorks = [...userDetails.works];
    updatedWorks[index][field] = value;
    setUserDetails(prev => ({ ...prev, works: updatedWorks }));
  };

  const addWork = () => {
    setUserDetails(prev => ({
      ...prev,
      works: [...prev.works, {
        position: '', company: '', city: '',
        startDate: '', endDate: '', jobsInfo: ''
      }]
    }));
  };

  const handleEduChange = (index, field, value) => {
    const updatedEdus = [...userDetails.educations];
    updatedEdus[index][field] = value;
    setUserDetails(prev => ({ ...prev, educations: updatedEdus }));
  };

  const addEducation = () => {
    setUserDetails(prev => ({
      ...prev,
      educations: [...prev.educations, {
        specialization: '', institution: '', city: '',
        startDate: '', endDate: '', educationInfo: ''
      }]
    }));
  };

  const handleLangChange = (index, field, value) => {
    const updatedLangs = [...userDetails.languages];
    updatedLangs[index][field] = value;
    setUserDetails(prev => ({ ...prev, languages: updatedLangs }));
  };

  const addLanguage = () => {
    setUserDetails(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', level: '' }]
    }));
  };



      // Отправка обновленных данных на сервер
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userEmail', username);
    formData.append('firstName', userDetails.firstName);
    formData.append('lastName', userDetails.lastName);
    formData.append('desiredPosition', userDetails.desiredPosition);
    formData.append('country', userDetails.country);
    formData.append('phone', userDetails.phone);
    formData.append('gender', userDetails.gender);
    formData.append('businessTrips', userDetails.businessTrips);
    formData.append('employment', userDetails.employment);
    formData.append('workMode', userDetails.workMode);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Ошибка: Токен не найден в localStorage.');
      return;
    }

    try {
      const response = await fetch('https://your-api-endpoint.com/user/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Данные успешно обновлены!');
      } else {
        console.error('Ошибка при обновлении данных!');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };
  // Содержимое для секции "Портфолио"
const renderPortfolio = () => (
  <div>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginTop: '20px'
    }}>
      <div style={{
        width: '150px',
        height: '150px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        fontSize: '14px',
        color: '#666',
        cursor: 'pointer',
        transition: 'transform 0.2s ease'
      }}
        /*onClick={() => alert('Открытие портфолио...')}*/
        onClick={() => window.open(pdfFile, '_blank')}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Портфолио 1
      </div>
    </div>
  </div>
);


  // Содержимое для секции "Проекты"
  const renderProjects = () => (
<div className='form-scroll'>
  <form onSubmit={handleFormSubmit}>
    <div className="form-grid">
      <div className="form-groupProf">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} required />
      </div>

      <div className="form-groupProf">
        <label htmlFor="firstName">Имя:</label>
        <input type="text" id="firstName" value={userDetails.firstName} onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })} required />
      </div>

      <div className="form-groupProf">
        <label htmlFor="lastName">Фамилия:</label>
        <input type="text" id="lastName" value={userDetails.lastName} onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })} required />
      </div>

      <div className="form-groupProf">
        <label htmlFor="desiredPosition">Желаемая позиция:</label>
        <input type="text" id="desiredPosition" value={userDetails.desiredPosition} onChange={(e) => setUserDetails({ ...userDetails, desiredPosition: e.target.value })} required />
      </div>

      <div className="form-groupProf">
        <label htmlFor="country">Страна:</label>
        <input type="text" id="country" value={userDetails.country} onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })} required />
      </div>

      <div className="form-groupProf">
        <label htmlFor="phone">Телефон:</label>
        <input type="text" id="phone" value={userDetails.phone} onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} />
      </div>

      <div className="form-groupProf">
        <label htmlFor="gender">Пол:</label>
        <input type="text" id="gender" value={userDetails.gender} onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })} />
      </div>

      <div className="form-groupProf">
        <label htmlFor="businessTrips">Командировки:</label>
        <input type="text" id="businessTrips" value={userDetails.businessTrips} onChange={(e) => setUserDetails({ ...userDetails, businessTrips: e.target.value })} />
      </div>

      <div className="form-groupProf">
        <label htmlFor="employment">Тип занятости:</label>
        <input type="text" id="employment" value={userDetails.employment} onChange={(e) => setUserDetails({ ...userDetails, employment: e.target.value })} />
      </div>

      <div className="form-groupProf">
        <label htmlFor="workMode">Формат работы:</label>
        <input type="text" id="workMode" value={userDetails.workMode} onChange={(e) => setUserDetails({ ...userDetails, workMode: e.target.value })} />
      </div>
    </div>

    {/* Works Section */}
    <h3 className="profile-form__section-title">Опыт работы</h3>
    {userDetails.works.map((work, index) => (
  <div key={index} className="form-section">
    <div className="form-row">
      <input type="text" placeholder="Должность" value={work.position} onChange={(e) => handleWorkChange(index, 'position', e.target.value)} />
      <input type="text" placeholder="Компания" value={work.company} onChange={(e) => handleWorkChange(index, 'company', e.target.value)} />
      <input type="text" placeholder="Город" value={work.city} onChange={(e) => handleWorkChange(index, 'city', e.target.value)} />
    </div>
    <div className="form-row">
      <input type="date" placeholder="Дата начала" value={work.startDate} onChange={(e) => handleWorkChange(index, 'startDate', e.target.value)} />
      <input type="date" placeholder="Дата окончания" value={work.endDate} onChange={(e) => handleWorkChange(index, 'endDate', e.target.value)} />
      <textarea placeholder="Описание обязанностей" value={work.jobsInfo} onChange={(e) => handleWorkChange(index, 'jobsInfo', e.target.value)} />
    </div>
  </div>
))}
<div className="button-group">
  <button type="button" className="profile-form__add-button" onClick={addWork}>Добавить опыт</button>
  <button type="button" className="profile-form__add-button" onClick={removeLastWork}>Удалить последний опыт</button>
</div>

    {/* Education Section */}
    <h3 className="profile-form__section-title">Образование</h3>
    {userDetails.educations.map((edu, index) => (
  <div key={index} className="form-section">
    <div className="form-row">
      <input type="text" placeholder="Специальность" value={edu.specialization} onChange={(e) => handleEduChange(index, 'specialization', e.target.value)} />
      <input type="text" placeholder="Учебное заведение" value={edu.institution} onChange={(e) => handleEduChange(index, 'institution', e.target.value)} />
      <input type="text" placeholder="Город" value={edu.city} onChange={(e) => handleEduChange(index, 'city', e.target.value)} />
    </div>
    <div className="form-row">
      <input type="date" placeholder="Начало обучения" value={edu.startDate} onChange={(e) => handleEduChange(index, 'startDate', e.target.value)} />
      <input type="date" placeholder="Окончание обучения" value={edu.endDate} onChange={(e) => handleEduChange(index, 'endDate', e.target.value)} />
      <textarea placeholder="Информация об обучении" value={edu.educationInfo} onChange={(e) => handleEduChange(index, 'educationInfo', e.target.value)} />
    </div>
  </div>
))}

<div className="button-group">
  <button type="button" className="profile-form__add-button" onClick={addEducation}>Добавить образование</button>
  <button type="button" className="profile-form__add-button" onClick={removeLastEducation}>Удалить последнее образование</button>
</div>
    {/* Languages Section */}
    <h3 className="profile-form__section-title">Языки</h3>
    {userDetails.languages.map((lang, index) => (
      <div key={index} className="form-section">
        <input type="text" placeholder="Язык" value={lang.language} onChange={(e) => handleLangChange(index, 'language', e.target.value)} />
        <select
      value={lang.level}
      onChange={(e) => handleLangChange(index, 'level', e.target.value)}
    >
      <option value="">Выберите уровень</option>
      <option value="1">1 — Начальный</option>
      <option value="2">2 — Базовый</option>
      <option value="3">3 — Средний</option>
      <option value="4">4 — Продвинутый</option>
      <option value="5">5 — Свободное владение</option>
    </select>
      </div>
    ))}
<div className="button-group">
  <button type="button" className="profile-form__add-button" onClick={addLanguage}>Добавить язык</button>
  <button type="button" className="profile-form__add-button" onClick={removeLastLanguage}>Удалить последний язык</button>
</div>
    <div>
    <button type="submit" className="profile-form__submit-button">Сохранить изменения</button>
    </div>
  </form>
</div>


  );

  // Содержимое для секции "Сообщения"
  const renderMessages = () => (
    <div className="renderMessages">
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.userId === userId.current ? 'sent' : 'received'}`}
          >
            {msg.text && <p>{msg.text}</p>} {/* Отображение текстового сообщения */}
            {msg.file && (
              <div>
                {msg.file.type.startsWith('image/') ? (
                  <img
                    src={msg.file.content}
                    alt={msg.file.name}
                    style={{ maxWidth: '200px', borderRadius: '5px', marginTop: '5px' }}
                  />
                ) : (
                  <a href={msg.file.content} download={msg.file.name}>
                    {msg.file.name}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="btnInput">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage() : null)}
          placeholder="Введите ваше сообщение"
        />
        <input
          type="file"
          accept="image/*, .pdf, .docx, .txt" // Разрешенные форматы файлов
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="fileUploadButton">
          📎
        </label>
        <button className="blue-button" onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
  
  return (
    <div className='profile-page'>
      <div className='profileData'>
        <div className='basePofInfo'>
          <div className='profPhoto'>
          <img src={Photo}  alt="Photo" />
          </div>
          <p className='profName'>{username || 'Имя пользователя'}</p> {/* Отображение имени пользователя */}          <div className='profPhone'>
            <label>
              <input type="text" readOnly />
            </label>
          </div>
          <button className="deleteProfileBtn" onClick={deleteProfile}>
            Удалить профиль
          </button>
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
