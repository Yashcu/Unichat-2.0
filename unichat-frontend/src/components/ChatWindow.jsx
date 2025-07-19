// src/components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatProvider';
import useAuth from '../hooks/useAuth';
import { summarizeChat } from '../services/ai'; // Import the new AI service

const ChatWindow = () => {
  const { messages, sendMessage, activeConversation, loading } = useChat();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const messagesEndRef = useRef(null);

  // New state for summarization
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  // Clear summary when conversation changes
  useEffect(() => {
    setSummary('');
    setSummaryError('');
  }, [activeConversation]);

  const handleSend = () => {
    if (input.trim() && activeConversation) {
      sendMessage(input, activeConversation, isAnonymous);
      setInput('');
    }
  };

  const handleSummarize = async () => {
    if (!activeConversation) return;
    setIsSummarizing(true);
    setSummaryError('');
    setSummary('');
    try {
      const response = await summarizeChat(activeConversation);
      setSummary(response.data.summary);
    } catch (err) {
      setSummaryError('Failed to get summary.');
    } finally {
      setIsSummarizing(false);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading messages...</div>;
  if (!activeConversation) return <div className="flex-1 flex items-center justify-center">Select a conversation to start chatting.</div>;

  return (
    <>
      <div className="p-2 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button 
            onClick={handleSummarize} 
            disabled={isSummarizing}
            className="bg-purple-600 text-white px-4 py-1 rounded-md text-sm disabled:bg-purple-300"
        >
          {isSummarizing ? 'Summarizing...' : 'Summarize Chat'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Summary Display */}
        {summary && (
            <div className="p-3 mb-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="font-bold text-purple-800">Conversation Summary:</p>
                <p className="text-sm text-gray-700">{summary}</p>
            </div>
        )}
        {summaryError && <p className="text-red-500 text-center mb-4">{summaryError}</p>}
        
        {messages.map((msg, idx) => (
          // ... message mapping code remains the same
          <div key={msg._id || idx} className={`mb-4 flex ${msg.sender._id === user.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-lg ${msg.sender._id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <p className="text-sm font-bold">{msg.isAnonymous ? 'Anonymous' : msg.sender.name}</p>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ... input bar code remains the same */}
      <div className="p-4 border-t flex items-center">
        <input
          className="flex-1 border rounded-full px-4 py-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        {user.role === 'student' && (
            <label className="mr-2 flex items-center text-sm">
                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="mr-1"/>
                Anonymous
            </label>
        )}
        <button onClick={handleSend} className="bg-blue-600 text-white px-6 py-2 rounded-full">
          Send
        </button>
      </div>
    </>
  );
};

export default ChatWindow;