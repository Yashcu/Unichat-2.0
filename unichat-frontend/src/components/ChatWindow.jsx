import React, { useState } from "react";
import useChat from "../hooks/useChat";

const ChatWindow = () => {
  const { messages, sendMessage, currentRoom, summarize } = useChat();
  const [input, setInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  const handleSend = () => {
    if (input.trim() && currentRoom) {
      sendMessage(currentRoom, input, isAnonymous);
      setInput("");
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSummarize = async () => {
    setLoadingSummary(true);
    setSummaryError("");
    try {
      const sum = await summarize(currentRoom);
      setSummary(sum);
    } catch (err) {
      setSummaryError("Failed to summarize conversation.");
    }
    setLoadingSummary(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-bold">{msg.isAnonymous ? "Anonymous" : msg.sender?.name}:</span>
            <span className="ml-2">{msg.content}</span>
          </div>
        ))}
      </div>
      {loadingSummary && <div>Loading summary...</div>}
      {summaryError && <div className="text-red-500">{summaryError}</div>}
      {summary && (
        <div className="bg-yellow-100 p-2 rounded mb-2">
          <strong>Summary:</strong> {summary}
        </div>
      )}
      <div className="flex items-center p-2 border-t">
        <input
          className="flex-1 border rounded p-2 mr-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type a message..."
        />
        <label className="mr-2 flex items-center">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={e => setIsAnonymous(e.target.checked)}
            className="mr-1"
          />
          Anonymous
        </label>
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        <button onClick={handleSummarize} className="ml-2 bg-green-600 text-white px-4 py-2 rounded">Summarize</button>
      </div>
    </div>
  );
};

export default ChatWindow;