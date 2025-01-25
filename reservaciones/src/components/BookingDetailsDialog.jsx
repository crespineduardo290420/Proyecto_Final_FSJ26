import React from "react"
import { MapPin, Calendar, User, Moon, X } from "lucide-react"

export function BookingDetailsDialog({ booking, open, onOpenChange, onUpdate, onDelete }) {
  const statusColors = {
    confirmed: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const statusText = {
    confirmed: "Confirmada",
    pending: "Pendiente",
    cancelled: "Cancelada",
  }

  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24),
  )

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
              onChange={(e) => onUpdate({ ...booking, status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="confirmed">Confirmada</option>
              <option value="pending">Pendiente</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-lg font-medium">{booking.guestName || "Sin nombre"}</div>
              <div className="flex items-center text-gray-500">
                <MapPin className="mr-2 h-4 w-4" />
                {booking.accommodation || "Dirección no disponible"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Check-in</div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(booking.checkIn).toLocaleDateString("es-ES", {
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
                  {new Date(booking.checkOut).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Información del Huésped</div>
              <div className="flex items-center text-gray-500">
                <User className="mr-2 h-4 w-4" />
                {booking.guestName || "Huésped no especificado"}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium mb-2">Resumen de la Estancia</div>
              <div className="flex items-center text-gray-500">
                <Moon className="mr-2 h-4 w-4" />
                {nights} {nights === 1 ? "noche" : "noches"}
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

