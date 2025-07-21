// src/pages/ChatPage.jsx
import React, { useState } from 'react';
import ChatListSidebar from '../components/ChatListSidebar';
import ChatWindowMain from '../components/ChatWindowMain';
import ChatInfoSidebar from '../components/ChatInfoSidebar';
import { useChat } from '../context/ChatProvider';

const ChatPage = () => {
  const { activeConversation } = useChat();
  const [infoOpen, setInfoOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-white mt-16">
      <ChatListSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {activeConversation ? (
          <ChatWindowMain onInfoClick={() => setInfoOpen((v) => !v)} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
      {activeConversation && (
        <ChatInfoSidebar open={infoOpen} onClose={() => setInfoOpen(false)} />
      )}
    </div>
  );
};

export default ChatPage;