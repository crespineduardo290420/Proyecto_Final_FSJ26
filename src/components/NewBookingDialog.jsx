import React, { useState } from "react"
import { X } from "lucide-react"
import { accommodations } from "../lib/data"

export function NewBookingDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    accommodation: "",
    guestName: "",
    checkIn: "",
    checkOut: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)

    checkIn.setHours(0, 0, 0, 0)
    checkOut.setHours(0, 0, 0, 0)

    if (checkOut < checkIn) {
      alert("La fecha de salida debe ser posterior a la fecha de entrada")
      return
    }

    const newBooking = {
      id: Math.random().toString(36).substr(2, 9),
      accommodation: formData.accommodation,
      guestName: formData.guestName,
      checkIn,
      checkOut,
      status: "pending",
    }

    onSubmit(newBooking)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Nueva Reservación</h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Alojamiento</label>
            <select
              value={formData.accommodation}
              onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
              aria-label="Seleccionar alojamiento"
            >
              <option value="" disabled>
                Seleccionar alojamiento
              </option>
              {accommodations.map((acc) => (
                <option key={acc.id} value={acc.name}>
                  {acc.name}
                </option>
              ))}
            </select>

          </div>

          <div className="mb-4">
            <label
              htmlFor="guestName"
              className="block text-sm font-semibold text-gray-800"
            >
              Huésped
                </label>
                <input
                  id="guestName"
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="Nombre del huésped"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200 ease-in-out"
                />
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="checkIn"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Fecha de inicio
                  </label>
                  <input
                    id="checkIn"
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkOut"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Fecha de fin
                  </label>
                  <input
                    id="checkOut"
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200 ease-in-out"
                  />
                </div>
              </div>


          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-[#E3F64B] text-black rounded-md hover:bg-[#d4e745]">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

