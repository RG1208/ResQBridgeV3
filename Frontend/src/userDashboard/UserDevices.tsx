"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Phone } from "lucide-react";
import axios from "axios";

interface SIDDDevice {
  id: string;
  driver: string;
  contact: string;
  car: string;
  status: string;
  emergency: string;
}

const defaultDevice: SIDDDevice = {
  id: "",
  driver: "",
  contact: "",
  car: "",
  status: "Active",
  emergency: "",
};

export default function DeviceManagement() {
  const [devices, setDevices] = useState<SIDDDevice[]>([]);
  const [newDevice, setNewDevice] = useState<SIDDDevice>(defaultDevice);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/api/sidd";

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setDevices(response.data);
    } catch (err) {
      console.error("Failed to fetch devices:", err);
      setError("Could not load devices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDevice({ ...newDevice, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateDevice = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_BASE_URL}/${newDevice.id}`, newDevice);
      } else {
        await axios.post(API_BASE_URL, newDevice);
      }
      resetModal();
      fetchDevices();
    } catch (err) {
      console.error("Error saving device:", err);
      setError("Failed to save device. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setDevices(devices.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Error deleting device:", err);
      setError("Failed to delete device.");
    }
  };

  const handleEdit = (device: SIDDDevice) => {
    setNewDevice(device);
    setEditMode(true);
    setShowModal(true);
  };

  const resetModal = () => {
    setNewDevice(defaultDevice);
    setShowModal(false);
    setEditMode(false);
    setError(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">SIDD Device Management</h1>
        <button
          onClick={() => {
            setNewDevice(defaultDevice);
            setEditMode(false);
            setShowModal(true);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus size={20} />
          Add Device
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading devices...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emergency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{device.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{device.driver}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{device.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{device.car}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{device.status}</td>
                  <td className="px-6 py-4 text-sm flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    {device.emergency}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex gap-2 justify-start">
                      <button onClick={() => handleEdit(device)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(device.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Device" : "Add Device"}</h2>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="id"
                value={newDevice.id}
                onChange={handleInputChange}
                placeholder="Device ID"
                className="w-full p-2 border rounded mb-2"
                disabled={editMode}
                required
              />
              <input
                type="text"
                name="driver"
                value={newDevice.driver}
                onChange={handleInputChange}
                placeholder="Driver"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="contact"
                value={newDevice.contact}
                onChange={handleInputChange}
                placeholder="Contact"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="car"
                value={newDevice.car}
                onChange={handleInputChange}
                placeholder="Car"
                className="w-full p-2 border rounded mb-2"
              />
              <select
                name="status"
                value={newDevice.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="text"
                name="emergency"
                value={newDevice.emergency}
                onChange={handleInputChange}
                placeholder="Emergency Contact"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={resetModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleAddOrUpdateDevice} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
