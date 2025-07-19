// src/components/ChatList.jsx
import React, { useState } from 'react';
import { useChat } from '../context/SocketProvider';
import useAuth from '../hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';
import NewChatModal from './NewChatModal';

const ChatList = () => {
  const { conversations, activeConversation, setActiveConversation } = useChat();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getConversationName = (convo) => {
    if (convo.name) return convo.name;
    const otherParticipant = convo.participants.find(p => p._id !== user.id);
    return otherParticipant ? otherParticipant.name : 'Unknown Chat';
  };

  const handleConversationCreated = (newConversation) => {
    setActiveConversation(newConversation._id);
    setIsModalOpen(false);
  };

  return (
    <div className="w-1/4 bg-gray-100 border-r h-full flex flex-col">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-bold text-lg">Chats</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button size="sm">New Chat</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Start a new conversation</DialogTitle>
                </DialogHeader>
                <NewChatModal onConversationCreated={handleConversationCreated} />
            </DialogContent>
        </Dialog>
      </div>
      <ul className="flex-1 overflow-y-auto">
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
