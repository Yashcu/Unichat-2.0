// src/components/ChatInfoSidebar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useChat } from '../context/ChatProvider';
import useAuth from '../hooks/useAuth';

const ChatInfoSidebar = ({ open, onClose }) => {
  const { activeConversation, getConversationName } = useChat();
  const { user } = useAuth();

  if (!activeConversation) return null;

  const isGroup = activeConversation.type === 'group';

  return (
    <aside
      className={`transition-all duration-300 bg-white border-l border-gray-200 w-80 max-w-xs h-full flex flex-col shadow-2xl z-20
        ${open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
        fixed md:static right-0 top-0 md:translate-x-0 md:opacity-100`}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div className="font-bold text-lg text-gray-900">Info</div>
        <button className="md:hidden p-2 text-gray-400 hover:text-blue-600" onClick={onClose}>&times;</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="font-semibold text-gray-500 mb-1 text-xs uppercase">
            {isGroup ? 'Group Name' : 'Conversation'}
          </div>
          <div className="text-gray-900 text-base font-semibold">
            {getConversationName(activeConversation)}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="font-semibold text-gray-500 mb-1 text-xs uppercase">Participants</div>
          <ul className="space-y-1.5 mt-2">
            {activeConversation.participants.map(p => (
              <li key={p._id} className="text-gray-800 font-medium text-sm">
                {p.name} {p._id === user.id && '(You)'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

ChatInfoSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatInfoSidebar;