import React from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Blocked';
};

const users: User[] = [
  { id: 'U001', name: 'Khushi Gaba', email: 'khushi@example.com', role: 'Admin', status: 'Active' },
  { id: 'U002', name: 'Rachit Garg', email: 'rachit@example.com', role: 'Admin', status: 'Active' },
  { id: 'U003', name: 'Neha Garg', email: 'neha@example.com', role: 'User', status: 'Blocked' },
];

const statusBadge = {
  Active: 'bg-green-100 text-green-700',
  Blocked: 'bg-red-100 text-red-700',
};

const UserManagement: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-md overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">User ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{user.id}</td>
                <td className="p-3 border-b">{user.name}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">{user.role}</td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3 border-b space-x-2">
                  <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    Promote
                  </button>
                  <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Block
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
