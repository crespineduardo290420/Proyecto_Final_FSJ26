import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import { createBooking } from "../services/bookingService"
import accommodationGet from "../services/getting"

export function NewBookingDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    booking: "",
    check_in_date: "",
    check_out_date: "",
    total_amount: 0,
    accomodation_id: "",
    user_id: 1, // Assuming a default user_id, you might want to handle this differently
  })
  const [accommodations, setAccommodations] = useState([])

  useEffect(() => {
    fetchAccommodations()
  }, [])

  const fetchAccommodations = async () => {
    try {
      const data = await accommodationGet()
      setAccommodations(data)
    } catch (error) {
      console.error("Failed to fetch accommodations", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newBooking = await createBooking(formData)
      onSubmit(newBooking)
    } catch (error) {
      console.error("Failed to create booking", error)
    }
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
              value={formData.accomodation_id}
              onChange={(e) => setFormData({ ...formData, accomodation_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Seleccionar alojamiento</option>
              {accommodations.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Código de Reserva</label>
            <input
              type="text"
              required
              value={formData.booking}
              onChange={(e) => setFormData({ ...formData, booking: e.target.value })}
              placeholder="Código de reserva"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
              <input
                type="date"
                required
                value={formData.check_in_date}
                onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de fin</label>
              <input
                type="date"
                required
                value={formData.check_out_date}
                onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Monto Total</label>
            <input
              type="number"
              required
              value={formData.total_amount}
              onChange={(e) => setFormData({ ...formData, total_amount: Number.parseFloat(e.target.value) })}
              placeholder="Monto total"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
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

