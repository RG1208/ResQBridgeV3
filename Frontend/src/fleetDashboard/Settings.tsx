import { useState } from 'react';
import { User, Lock, Key } from 'lucide-react';

interface Profile {
  name: string;
  email: string;
  phone: string;
  company: string;
}

const initialProfile: Profile = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '(555) 123-4567',
  company: 'Fleet Corp Inc.',
};

export default function Settings() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [apiToken] = useState('sk_test_12345678901234567890');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <User className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Lock className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Key className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">API Token</h2>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-sm">{apiToken}</code>
          </div>
          <p className="mt-2 text-sm text-gray-500">Use this token to authenticate API requests</p>
        </div>
      </div>
    </div>
  );
}