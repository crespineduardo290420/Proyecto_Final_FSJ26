import React from "react"
import { MapPin, Calendar, User, Moon, X } from "lucide-react"
import { updateBookingStatus } from "../services/bookingService"

export function BookingDetailsDialog({ booking, open, onOpenChange, onUpdate, onDelete }) {
  const statusColors = {
    CONFIRMED: "bg-blue-100 text-blue-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    CANCELLED: "bg-red-100 text-red-800",
  }

  const statusText = {
    CONFIRMED: "Confirmada",
    PENDING: "Pendiente",
    CANCELLED: "Cancelada",
  }

  const handleStatusChange = async (newStatus) => {
    try {
      await updateBookingStatus(booking.id, newStatus)
      onUpdate({ ...booking, status: newStatus })
    } catch (error) {
      console.error("Failed to update booking status", error)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Detalles de la Reservación</h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}
            >
              {statusText[booking.status]}
            </div>
            <select
              value={booking.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="CONFIRMED">Confirmada</option>
              <option value="PENDING">Pendiente</option>
              <option value="CANCELLED">Cancelada</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-lg font-medium">{booking.booking}</div>
              <div className="flex items-center text-gray-500">
                <MapPin className="mr-2 h-4 w-4" />
                {booking.accomodation?.name || "Alojamiento no disponible"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Check-in</div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(booking.check_in_date).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Check-out</div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(booking.check_out_date).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Información de la Reserva</div>
              <div className="flex items-center text-gray-500">
                <User className="mr-2 h-4 w-4" />
                {`Reserva: ${booking.booking}`}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium mb-2">Resumen de la Estancia</div>
              <div className="flex items-center text-gray-500">
                <Moon className="mr-2 h-4 w-4" />
                {`Monto total: $${booking.total_amount}`}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <button
              onClick={() => onDelete(booking.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancelar Reservación
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

