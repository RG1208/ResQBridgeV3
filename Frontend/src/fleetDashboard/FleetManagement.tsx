"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import axios from "axios"

interface Vehicle {
  id: string
  model: string
  status: "Online" | "Offline"
  sidd: string
  state: "Moving" | "Stationary"
}

const defaultVehicle: Vehicle = {
  id: "",
  model: "",
  status: "Offline",
  sidd: "",
  state: "Stationary",
}

export default function FleetManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newVehicle, setNewVehicle] = useState<Vehicle>(defaultVehicle)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API base URL - adjust this to match your Flask backend URL
  const API_BASE_URL = "https://resqbridgev3.onrender.com/api/fleet"

  // Fetch vehicles from the backend
  const fetchVehicles = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_BASE_URL}/vehicles`)
      if (Array.isArray(response.data)) {
        setVehicles(response.data)
      } else {
        setVehicles([])
        setError("Received invalid data format from server")
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err)
      setError("Failed to load vehicles. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Load vehicles on component mount
  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value })
  }

  const handleAddOrUpdateVehicle = async () => {
    try {
      if (editMode) {
        const response = await axios.put(`${API_BASE_URL}/vehicles/${newVehicle.id}`, newVehicle)
        setVehicles(vehicles.map((v) => (v.id === newVehicle.id ? response.data : v)))
      } else {
        const response = await axios.post(`${API_BASE_URL}/vehicles`, newVehicle)
        setVehicles([...vehicles, response.data])
      }
      resetModal()
      // Refresh the list to ensure we have the latest data
      fetchVehicles()
    } catch (err) {
      console.error("Error saving vehicle:", err)
      setError("Failed to save vehicle. Please try again.")
    }
  }

const handleDelete = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/vehicles/${id}`, {
      withCredentials: true,  // Ensure cookies and authorization headers are sent
    });
    setVehicles(vehicles.filter((v) => v.id !== id));
    fetchVehicles();
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    setError("Failed to delete vehicle. Please try again.");
  }
};

  const handleEdit = (vehicle: Vehicle) => {
    setNewVehicle(vehicle)
    setEditMode(true)
    setShowAddModal(true)
  }

  const resetModal = () => {
    setShowAddModal(false)
    setNewVehicle(defaultVehicle)
    setEditMode(false)
    setError(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>
        <button
          onClick={() => {
            setNewVehicle(defaultVehicle)
            setShowAddModal(true)
            setEditMode(false)
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus size={20} />
          Add Vehicle
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {vehicles.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No vehicles found. Add a new vehicle to get started.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SIDD
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{vehicle.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{vehicle.model}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          vehicle.status === "Online" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{vehicle.sidd}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{vehicle.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(vehicle)} className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(vehicle.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Vehicle" : "Add Vehicle"}</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <input
              type="text"
              name="id"
              value={newVehicle.id}
              onChange={handleInputChange}
              placeholder="Vehicle ID"
              className="w-full p-2 border rounded mb-2"
              disabled={editMode}
              required
            />
            <input
              type="text"
              name="model"
              value={newVehicle.model}
              onChange={handleInputChange}
              placeholder="Model"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              name="sidd"
              value={newVehicle.sidd}
              onChange={handleInputChange}
              placeholder="SIDD ID"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <select
              name="status"
              value={newVehicle.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            <select
              name="state"
              value={newVehicle.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="Moving">Moving</option>
              <option value="Stationary">Stationary</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={resetModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateVehicle}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={!newVehicle.id || !newVehicle.model || !newVehicle.sidd}
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
