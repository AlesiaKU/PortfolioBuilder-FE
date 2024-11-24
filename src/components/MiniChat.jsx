import React, { useState, useEffect, useRef } from 'react';
import '../styles/MiniChat.css';

function MiniChat({ onExpand }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const ws = useRef(null);
  const userId = useRef(Date.now() + Math.random().toString());

  useEffect(() => {
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

    return () => ws.current.close();
  }, []);

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

  const sendMessage = () => {
    if (ws.current.readyState === WebSocket.OPEN && (input.trim() || file)) {
      const message = {
        id: Date.now(),
        userId: userId.current,
        text: input || null,
        file: file || null, // Отправляем файл, если он есть
      };

      ws.current.send(JSON.stringify({ type: 'message', data: message }));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
      setFile(null); // Сбрасываем файл после отправки
    } else {
      console.error('WebSocket is not open yet.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile({
          name: selectedFile.name,
          type: selectedFile.type,
          content: reader.result, // Кодируем файл в Base64
        });
      };
      reader.readAsDataURL(selectedFile); // Кодируем в Base64 для передачи
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
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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
    </div>
  );
}

export default MiniChat;
