import React, { useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";

const ChatList = () => {
  const { user, token } = useAuth();
  const { setCurrentRoom, currentRoom } = useChat();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await api.get("/chat/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConversations(res.data);
    };
    if (token) fetchConversations();
  }, [token]);

  return (
    <div className="w-64 bg-white border-r h-full">
      <h2 className="p-4 font-bold">Chats</h2>
      <ul>
        {conversations.map((conv) => (
          <li
            key={conv._id}
            className={`p-2 hover:bg-gray-100 cursor-pointer ${currentRoom === conv._id ? "bg-blue-100" : ""}`}
            onClick={() => setCurrentRoom(conv._id)}
          >
            {conv.name || conv.participants.filter(p => p._id !== user.id).map(p => p.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;