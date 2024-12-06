import React, { useState } from 'react';
import { FaEdit, FaTrash, FaFilter } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'User', 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'Coach', 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@example.com', 
      role: 'Admin', 
      status: 'Inactive' 
    }
  ]);

  const [filter, setFilter] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const filteredUsers = users.filter(user => 
    (filter ? 
      user.name.toLowerCase().includes(filter.toLowerCase()) || 
      user.email.toLowerCase().includes(filter.toLowerCase()) 
      : true) &&
    (selectedRole ? user.role === selectedRole : true)
  );

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      {/* Filters */}
      <div className="flex mb-6 space-x-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FaFilter className="absolute left-3 top-4 text-gray-400" />
        </div>

        <select 
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Roles</option>
          <option value="User">User</option>
          <option value="Coach">Coach</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${user.role === 'Admin' 
                      ? 'bg-red-100 text-red-800' 
                      : user.role === 'Coach' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'}
                  `}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}
                  `}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center space-x-3">
                  <button 
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {/* Edit user logic */}}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserManagement;