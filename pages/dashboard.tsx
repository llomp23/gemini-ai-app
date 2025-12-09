'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, an error occurred. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0f1419',
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        backgroundColor: '#1a1a2e',
        padding: '20px',
        borderBottom: '1px solid #444',
        color: '#fff',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0', fontSize: '24px', fontWeight: '600' }}>Gemini AI App</h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#aaa' }}>Powered by Gemini Flash 1.5</p>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {messages.length === 0 && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#aaa',
            textAlign: 'center'
          }}>
            <div>
              <p style={{ fontSize: '18px', marginBottom: '10px' }}>Welcome to Gemini AI Chat</p>
              <p style={{ fontSize: '14px' }}>Start a conversation by typing a message below</p>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: msg.sender === 'user' ? '#667eea' : '#444',
              color: '#fff',
              wordWrap: 'break-word'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: '#444',
              color: '#fff'
            }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        backgroundColor: '#1a1a2e',
        padding: '20px',
        borderTop: '1px solid #444'
      }}>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#0f1419',
              color: '#fff',
              fontSize: '14px',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'text'
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#667eea',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !input.trim() ? 0.6 : 1
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
