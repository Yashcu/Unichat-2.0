// src/pages/ChatPage.jsx
import React from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => (
  <div className="flex h-full border rounded-lg overflow-hidden">
    <ChatList />
    <div className="flex-1 flex flex-col">
      <ChatWindow />
    </div>
  </div>
);

export default ChatPage;