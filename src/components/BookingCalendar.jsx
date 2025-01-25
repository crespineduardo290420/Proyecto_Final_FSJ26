import React, { useState } from "react"
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react"
import { NewBookingDialog } from "./NewBookingDialog"
import { BookingDetailsDialog } from "./BookingDetailsDialog"
import { accommodations, initialBookings } from "../lib/data"

export function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookings, setBookings] = useState(initialBookings)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showNewBooking, setShowNewBooking] = useState(false)
  const [selectedAccommodation, setSelectedAccommodation] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const getBookingsForDay = (day) => {
    return bookings.filter((booking) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)

      date.setHours(0, 0, 0, 0)
      checkIn.setHours(0, 0, 0, 0)
      checkOut.setHours(0, 0, 0, 0)

      return date >= checkIn && date <= checkOut
    })
  }

  const handleNewBooking = (booking) => {
    setBookings([...bookings, booking])
    setShowNewBooking(false)
  }

  const handleUpdateBooking = (updatedBooking) => {
    setBookings(bookings.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)))
    setSelectedBooking(null)
  }

  const handleDeleteBooking = (bookingId) => {
    setBookings(bookings.filter((b) => b.id !== bookingId))
    setSelectedBooking(null)
  }

  const monthName = currentMonth.toLocaleString("es-ES", { month: "long", year: "numeric" })

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium">Reservaciones</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtros</span>
            </button>
            <button
              onClick={() => setShowNewBooking(true)}
              className="px-4 py-2 bg-[#E3F64B] text-black font-medium rounded-md hover:bg-[#d4e745]"
            >
              + Nueva Reservación
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedAccommodation}
            onChange={(e) => setSelectedAccommodation(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="all">Todos los alojamientos</option>
            {accommodations.map((acc) => (
              <option key={acc.id} value={acc.name}>
                {acc.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmada</option>
            <option value="pending">Pendiente</option>
            <option value="cancelled">Cancelada</option>
          </select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="w-full p-2 pl-10 border rounded-md"
              placeholder="Buscar huésped..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium capitalize">{monthName}</h2>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((day) => (
            <div key={day} className="bg-white p-2 text-sm text-center font-medium">
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="bg-white p-2 min-h-[100px]" />
          ))}

          {days.map((day) => {
            const dayBookings = getBookingsForDay(day)
            return (
              <div key={day} className="bg-white p-2 h-[100px] border-t flex flex-col">
                <div className="text-sm mb-1 flex-shrink-0">{day}</div>
                <div className="space-y-1 flex-grow">
                  {dayBookings.slice(0, 3).map((booking) => {
                    const statusColors = {
                      confirmed: "bg-blue-100 text-blue-800",
                      pending: "bg-yellow-100 text-yellow-800",
                      cancelled: "bg-red-100 text-red-800",
                    }
                    return (
                      <div
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className={`${statusColors[booking.status]} p-1 rounded text-xs cursor-pointer truncate`}
                      >
                        {booking.guestName}
                      </div>
                    )
                  })}
                  {dayBookings.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">+{dayBookings.length - 3} más</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-4 border-t flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm">Confirmada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm">Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm">Cancelada</span>
          </div>
        </div>
      </div>

      {showNewBooking && (
        <NewBookingDialog open={showNewBooking} onOpenChange={setShowNewBooking} onSubmit={handleNewBooking} />
      )}

      {selectedBooking && (
        <BookingDetailsDialog
          booking={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={() => setSelectedBooking(null)}
          onUpdate={handleUpdateBooking}
          onDelete={handleDeleteBooking}
        />
      )}
    </div>
  )
}

