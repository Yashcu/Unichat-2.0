// src/components/ChatListSidebar.jsx
import React, { useState, useMemo } from 'react';
import { useChat } from '../context/ChatProvider';

const ChatListSidebar = () => {
  const { conversations, activeConversation, selectConversation, getConversationName } = useChat();
  const [search, setSearch] = useState('');

  const filteredConversations = useMemo(() => {
    if (!search) return conversations;
    return conversations.filter(convo =>
      getConversationName(convo).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, conversations, getConversationName]);

  return (
    <aside className="w-72 min-w-[220px] max-w-xs h-full flex flex-col bg-white border-r border-gray-200 shadow-xl">
      <div className="p-4 border-b border-gray-200">
        <input
          className="w-full px-3 py-2 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition text-sm"
          placeholder="Search chats..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <nav className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredConversations.map(convo => (
          <div
            key={convo._id}
            className={`flex items-center px-4 py-2.5 rounded-lg cursor-pointer group transition-all duration-150 m-2
              ${activeConversation?._id === convo._id ? 'bg-blue-50 border border-blue-200 shadow-sm' : 'hover:bg-gray-100'}
            `}
            onClick={() => selectConversation(convo)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectConversation(convo);
              }
            }}
            tabIndex={0}
          >
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm truncate ${activeConversation?._id === convo._id ? 'text-blue-700' : 'text-gray-800'}`}>
                {getConversationName(convo)}
              </div>
              {/* You can add last message preview here later */}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ChatListSidebar;