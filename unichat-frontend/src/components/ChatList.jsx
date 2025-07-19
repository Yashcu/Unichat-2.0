// src/components/ChatList.jsx
import React from 'react';
import { useChat } from '../context/ChatProvider';
import useAuth from '../hooks/useAuth';

const ChatList = () => {
  const { conversations, activeConversation, setActiveConversation } = useChat();
  const { user } = useAuth();

  const getConversationName = (convo) => {
    if (convo.name) return convo.name; // For group chats
    // For one-on-one chats, find the other participant's name
    const otherParticipant = convo.participants.find(p => p._id !== user.id);
    return otherParticipant ? otherParticipant.name : 'Unknown Chat';
  };

  return (
    <div className="w-1/4 bg-gray-100 border-r h-full">
      <h2 className="p-4 font-bold text-lg">Chats</h2>
      <ul>
        {conversations.map((convo) => (
          <li
            key={convo._id}
            className={`p-3 hover:bg-gray-200 cursor-pointer ${activeConversation === convo._id ? "bg-blue-100" : ""}`}
            onClick={() => setActiveConversation(convo._id)}
          >
            {getConversationName(convo)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;