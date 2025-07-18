import React from "react";
import ChatList from "../../components/ChatList";
import ChatWindow from "../../components/chatWindow";
import { ChatProvider } from "../../context/ChatProvider";

const ChatPage = () => (
  <ChatProvider>
    <div className="flex h-screen">
      <ChatList />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  </ChatProvider>
);

export default ChatPage;