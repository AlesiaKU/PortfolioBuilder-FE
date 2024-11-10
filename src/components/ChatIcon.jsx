import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import MiniChat from './MiniChat';
import '../styles/chatIcon.css';

function ChatIcon() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Показываем иконку на всех страницах, кроме /profile
  if (location.pathname === '/profile') {
    return null;
  }

  const handleClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className="chat-icon" onClick={handleClick}>
        <FaComments size={28} />
      </div>
      {isChatOpen && <MiniChat onExpand={() => navigate('/profile')} />}
    </>
  );
}

export default ChatIcon;
