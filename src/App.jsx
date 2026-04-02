import React, { useState } from 'react';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import { generateChatResponse } from './services/gemini';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text) => {
    // Add user message to UI immediately
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Call Gemini API passing history (without the new message, we pass it separately)
      const aiResponse = await generateChatResponse(messages, text);

      // Add AI response to UI
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      // Add error message to UI
      setMessages(prev => [...prev, {
        role: 'ai',
        content: `**Error:** ${error.message || 'Something went wrong. Please check your API key and connection.'}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">AI</div>
        <div className="app-title">
          <h1>Gemini Assistant</h1>
          <p>Powered by Google</p>
        </div>
      </header>

      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
