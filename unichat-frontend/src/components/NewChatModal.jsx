// src/components/NewChatModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { searchUsers } from '../services/user';
import { createConversation } from '../services/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewChatModal = ({ onConversationCreated }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 2) {
            const response = await searchUsers(query);
            setSearchResults(response.data);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectUser = (user) => {
        if (!selectedUsers.find(u => u._id === user._id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleCreateConversation = async () => {
        const participantIds = selectedUsers.map(u => u._id);
        const data = {
            participants: participantIds,
            name: selectedUsers.length > 1 ? groupName : null
        };
        const newConversation = await createConversation(data);
        onConversationCreated(newConversation.data);
    };

    return (
        <div className="space-y-4">
            <div>
                <Input placeholder="Search for users by name or email..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                {searchResults.length > 0 && (
                    <div className="border rounded-md mt-2">
                        {searchResults.map(user => (
                            <div key={user._id} onClick={() => handleSelectUser(user)} className="p-2 hover:bg-gray-100 cursor-pointer">{user.name} ({user.email})</div>
                        ))}
                    </div>
                )}
            </div>
            {selectedUsers.length > 0 && (
                <div>
                    <p className="font-semibold">Selected:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedUsers.map(user => <span key={user._id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{user.name}</span>)}
                    </div>
                </div>
            )}
            {selectedUsers.length > 1 && (
                <Input placeholder="Group Name (optional)" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            )}
            <Button onClick={handleCreateConversation} disabled={selectedUsers.length === 0}>
                {selectedUsers.length > 1 ? 'Create Group Chat' : 'Start Chat'}
            </Button>
        </div>
    );
};

NewChatModal.propTypes = {
    onConversationCreated: PropTypes.func.isRequired
};

export default NewChatModal;
