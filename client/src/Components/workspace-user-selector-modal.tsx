import React, { useState } from 'react';
import { User } from '../Types/Workspace';

interface WorkspaceUserSelectorModalProps {
  users: User[];
  onClose: () => void; // Callback to close the modal
}

const WorkspaceUserSelectorModal: React.FC<WorkspaceUserSelectorModalProps> = ({
  users,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleSelectUser = (selectedUser: User) => {
    // Handle select user logic here
    console.log('Selected user:', selectedUser);
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
          placeholder="Search usernames"
        />
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.accountId}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-md"
            >
              <span>{user.username}</span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => handleSelectUser(user)} // Pass the user to the handler
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceUserSelectorModal;
