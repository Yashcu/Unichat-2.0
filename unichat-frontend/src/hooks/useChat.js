import { useContext } from "react";
import { ChatContext } from "../context/SocketProvider";
const useChat = () => useContext(ChatContext);
export default useChat;
