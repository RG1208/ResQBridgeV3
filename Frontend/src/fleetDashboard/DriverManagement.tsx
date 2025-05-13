"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Phone } from "lucide-react";
import axios from "axios";

interface Driver {
  id: string;
  name: string;
  phone: string;
  assignedVehicle: string;
  status: "Active" | "Off Duty";
  emergencyContact: string;
}

const defaultDriver: Driver = {
  id: "",
  name: "",
  phone: "",
  assignedVehicle: "",
  status: "Active",
  emergencyContact: "",
};

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [newDriver, setNewDriver] = useState<Driver>(defaultDriver);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/api/driver/drivers";

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setDrivers(response.data);
    } catch (err) {
      console.error("Failed to fetch drivers:", err);
      setError("Could not load drivers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateDriver = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_BASE_URL}/${newDriver.id}`, newDriver);
      } else {
        await axios.post(API_BASE_URL, newDriver);
      }
      resetModal();
      fetchDrivers();
    } catch (err) {
      console.error("Error saving driver:", err);
      setError("Failed to save driver. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setDrivers(drivers.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Error deleting driver:", err);
      setError("Failed to delete driver.");
    }
  };

  const handleEdit = (driver: Driver) => {
    setNewDriver(driver);
    setEditMode(true);
    setShowModal(true);
  };

  const resetModal = () => {
    setNewDriver(defaultDriver);
    setShowModal(false);
    setEditMode(false);
    setError(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
        <button
          onClick={() => {
            setNewDriver(defaultDriver);
            setEditMode(false);
            setShowModal(true);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus size={20} />
          Add Driver
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading drivers...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emergency Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{driver.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.assignedVehicle}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        driver.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    {driver.emergencyContact}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex gap-2 justify-start">
                      <button
                        onClick={() => handleEdit(driver)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="text-red-600 hover:text-red-800"
                      >
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
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Driver" : "Add Driver"}</h2>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="id"
                value={newDriver.id}
                onChange={handleInputChange}
                placeholder="Driver ID"
                className="w-full p-2 border rounded mb-2"
                disabled={editMode}
                required
              />
              <input
                type="text"
                name="name"
                value={newDriver.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="phone"
                value={newDriver.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="assignedVehicle"
                value={newDriver.assignedVehicle}
                onChange={handleInputChange}
                placeholder="Assigned Vehicle"
                className="w-full p-2 border rounded mb-2"
              />
              <select
                name="status"
                value={newDriver.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Active">Active</option>
                <option value="Off Duty">Off Duty</option>
              </select>
              <input
                type="text"
                name="emergencyContact"
                value={newDriver.emergencyContact}
                onChange={handleInputChange}
                placeholder="Emergency Contact"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={resetModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateDriver}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
