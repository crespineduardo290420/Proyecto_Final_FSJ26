export const accommodations = [
    { id: "1", name: "Casa de Playa" },
    { id: "2", name: "Apartamento Centro" },
    { id: "3", name: "Villa Montaña" },
  ]
  
  export const initialBookings = [
    {
      id: "1",
      guestName: "Juan Pérez",
      accommodation: "Casa de Playa",
      checkIn: new Date(2024, 9, 15),
      checkOut: new Date(2024, 9, 16),
      status: "confirmed",
    },
    {
      id: "2",
      guestName: "María García",
      accommodation: "Apartamento Centro",
      checkIn: new Date(2024, 9, 16),
      checkOut: new Date(2024, 9, 17),
      status: "pending",
    },
    {
      id: "3",
      guestName: "Carlos Ruiz",
      accommodation: "Villa Montaña",
      checkIn: new Date(2024, 9, 16),
      checkOut: new Date(2024, 9, 17),
      status: "cancelled",
    },
  ]
  
  