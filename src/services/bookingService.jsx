import axios from "axios"

const API_URL = "https://apibookingsaccomodations-production.up.railway.app/api/V1"
const token = sessionStorage.getItem("api-token")

const headers = {
  Authorization: `Bearer ${token}`,
  "X-CSRF-TOKEN": "",
}

export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings`, { headers })
    return response.data
  } catch (error) {
    console.error("Error fetching bookings", error)
    throw error
  }
}

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/status_booking/${id}`, { status }, { headers })
    return response.data
  } catch (error) {
    console.error("Error updating booking status", error)
    throw error
  }
}

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/booking`, bookingData, { headers })
    return response.data
  } catch (error) {
    console.error("Error creating booking", error)
    throw error
  }
}

export const getBookingsCalendar = async (id, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/calendar/${id}?start_date=${startDate}&end_date=${endDate}`, {
      headers,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching bookings calendar", error)
    throw error
  }
}

