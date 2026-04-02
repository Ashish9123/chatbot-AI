import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ role, content }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'ai'}`}>
      <div className="message-avatar">
        {isUser ? 'U' : 'AI'}
      </div>
      <div className="message-content">
        <div className="message-bubble">
          {isUser ? (
            <p>{content}</p>
          ) : (
            <div className="markdown-body">
              {content.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
