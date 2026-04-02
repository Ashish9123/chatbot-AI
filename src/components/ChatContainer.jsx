import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import './ChatContainer.css';

const ChatContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <h2>How can I help you today?</h2>
          <p>I am your AI assistant powered by Google Gemini.</p>
        </div>
      ) : (
        <div className="messages-wrapper">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index}
              role={msg.role}
              content={msg.content}
            />
          ))}
          {isLoading && (
            <div className="loading-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
