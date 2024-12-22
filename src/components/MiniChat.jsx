import React, { useState, useEffect, useRef } from 'react';
import '../styles/MiniChat.css';

function MiniChat({ onExpand }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const userId = useRef(Date.now() + Math.random().toString());
  const [isTyping, setIsTyping] = useState(false); // Флаг для имитации печати

  useEffect(() => {
    // Инициализация WebSocket
    ws.current = new WebSocket('ws:http://26.188.13.76:8080');

    ws.current.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log('Received message from server:', parsedData);

        if (parsedData.type === 'message' && (parsedData.data?.text || parsedData.data?.file)) {
          setMessages((prevMessages) => [...prevMessages, parsedData.data]);
        } else {
          console.error('Получено пустое или некорректное сообщение:', parsedData);
        }
      } catch (error) {
        console.error('Ошибка при разборе сообщения:', error);
      }
    };

    // Добавление приветственного сообщения от сервера при открытии чата
    setMessages([
      {
        id: 'server-welcome',
        userId: 'server',
        text: 'Добрый день! Могу я вам чем-то помочь?',
      },
    ]);

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        id: Date.now(),
        userId: userId.current,
        text: input,
      };
      ws.current.send(JSON.stringify(message)); // Отправляем сообщение в формате JSON
      setMessages((prevMessages) => [...prevMessages, message]); // Добавляем сообщение в свой список сообщений
      handleAutoReply(input.trim());
      setInput(''); // Очищаем поле ввода
    }
  };

  const handleAutoReply = (userMessage) => {
    if (userMessage.toLowerCase().includes('могу я узнать номер поддержки')) {
      setIsTyping(true); // Показываем "печать"
      setTimeout(() => {
        setIsTyping(false); // Убираем "печать"
        const autoReply = {
          id: Date.now(),
          userId: 'server',
          text: '+375(29) 123 45 69',
        };
        setMessages((prevMessages) => [...prevMessages, autoReply]);
      }, 5000); // Задержка 5 секунд
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
        ws.current.send(JSON.stringify({ type: 'file', data: fileMessage }));
        setMessages((prevMessages) => [...prevMessages, fileMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mini-chat">
      <div className="mini-chat-header">
        <span>Chat</span>
      </div>
      <div className="mini-chat-content">
        <div className="chat-boxMini">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.userId === userId.current ? 'sent' : 'received'}`}
            >
              {msg.text && <p>{msg.text}</p>}
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
          {isTyping && (
            <div className="message typing-indicator">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          )}
        </div>
        <div className="btnInput">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Введите ваше сообщение"
          />
          <input
            type="file"
            accept="image/*, .pdf, .docx, .txt"
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
    </div>
  );
}

export default MiniChat;
