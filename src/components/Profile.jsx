import React, { useState, useEffect, useRef } from 'react';
import '../styles/profile.css'; 
import Photo from '../img/27685d3c5ffe8936e872afffa3ed6625.jpg'

function Profile() {
  const [activeSection, setActiveSection] = useState('portfolio'); // Установим начальное значение на 'portfolio'
  const [username, setUsername] = useState(''); // Состояние для хранения почты
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
        <button onClick={sendMessage}>Отправить</button>
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
