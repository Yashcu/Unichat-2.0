// src/components/ChatWindowMain.jsx
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paperclip, Info } from 'lucide-react';
import { useChat } from '../context/ChatProvider';
import useAuth from '../hooks/useAuth';

const ChatWindowMain = ({ onInfoClick }) => {
  const { messages, sendMessage, activeConversation, getConversationName, loading } = useChat();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input, false); // `isAnonymous` can be added here if needed
      setInput('');
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading messages...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
        <div>
          <div className="font-bold text-lg text-gray-900 tracking-tight leading-tight">
            {getConversationName(activeConversation)}
          </div>
          {/* You can add online status here */}
        </div>
        <button
          onClick={onInfoClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition group"
          aria-label="Chat information"
        >
          <Info size={22} className="text-gray-400 group-hover:text-blue-600 transition" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 custom-scrollbar bg-gray-50">
        {messages.map((msg) => {
          const isMe = msg.sender._id === user.id;
          const senderName = msg.isAnonymous ? 'Anonymous' : msg.sender.name;
          return (
            <div
              key={msg._id}
              className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`relative px-4 py-2.5 max-w-lg rounded-2xl shadow-sm
                  ${isMe
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'}
                `}
              >
                <div className={`text-xs font-semibold mb-1 ${isMe ? 'text-blue-100' : 'text-gray-600'}`}>
                  {isMe ? 'You' : senderName}
                </div>
                <div className="leading-normal text-sm font-normal break-words">{msg.content}</div>
                <div className={`text-[11px] text-right mt-1.5 ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="px-8 py-5 border-t border-gray-200 bg-white flex items-center gap-3 shadow-sm">
        <input
          className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 bg-gray-50"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          className="ml-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

ChatWindowMain.propTypes = {
  onInfoClick: PropTypes.func.isRequired,
};

export default ChatWindowMain;