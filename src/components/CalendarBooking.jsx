import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import Select from 'react-select';
import Modal from 'react-modal';
import bookingGet from '../services/BookingGet';
import bookingPatch from '../services/bookingPatch';
import bookingPost from '../services/bookingPost';
import accommodationGet from '../services/getting';

// Configuración del modal
Modal.setAppElement('#root');

function CalendarBooking() {
  const localizer = dayjsLocalizer(dayjs);

  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [newBooking, setNewBooking] = useState({
    user: '',
    accomodation_id: '',
    check_in_date: '',
    check_out_date: '',
    total_amount: '',
    status: 'CONFIRMED',
  });

  // Fetch de alojamientos
  const fetchAccommodations = async () => {
    const accommodationsData = await accommodationGet();
    setAccommodations(
      accommodationsData.map((acc) => ({ value: acc.id, label: acc.name }))
    );
  };

  // Fetch de bookings
  const fetchBookings = async () => {
    const bookingsData = await bookingGet();
    setEvents(
      bookingsData.map((booking) => ({
        title: booking.user,
        accomodation: booking.accomodation,
        start: new Date(booking.check_in_date),
        end: new Date(booking.check_out_date),
        status: booking.status,
      }))
    );
  };

  // Crear una nueva reserva
  const createBooking = async () => {
    try {
      const newBookingData = {
        user: newBooking.user,
        accomodation_id: newBooking.accomodation_id,
        check_in_date: newBooking.check_in_date,
        check_out_date: newBooking.check_out_date,
        total_amount: parseFloat(newBooking.total_amount),
      };
      await bookingPost(newBookingData);
      alert("Booking creado con éxito");
      setModalIsOpen(false);
      fetchBookings();
    } catch (error) {
      console.error("Error creando booking:", error);
      alert("Error al crear el booking");
    }
  };

  // Actualizar valores del formulario
  const handleInputChange = (field, value) => {
    setNewBooking((prevState) => ({ ...prevState, [field]: value }));
  };

  // useEffect para cargar eventos y alojamientos al montar el componente
  useEffect(() => {
    fetchBookings();
    fetchAccommodations();
  }, []);

  // Estilos personalizados para el calendario
  const components = {
    event: (props) => (
      <div
        style={{
          backgroundColor:
            props.event.status === 'CONFIRMED' ? '#DBEAFE' :
            props.event.status === 'PENDING' ? '#FEF9C3' :
            props.event.status === 'CANCELLED' ? '#FEE2E2' : '',
          color:
            props.event.status === 'CONFIRMED' ? '#1E40AF' :
            props.event.status === 'PENDING' ? '#854D0E' :
            props.event.status === 'CANCELLED' ? '#991B1B' : '',
          fontSize: '12px',
          outline: 'none',  
        border: 'none', 
        borderColor: "transparent",  
        }}
      >
        <strong>{props.event.title}</strong>
        <br />
        <span>{props.event.accomodation}</span>

      </div>
    ),
  };


  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setModalIsOpen(true)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#2563EB',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Agregar Booking
      </button>

      {/* Modal para agregar booking */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            zIndex: 1050, // Asegurarte de que tenga un índice alto
            position: 'absolute', // Garantizar la posición correcta
          },
          overlay: {
            zIndex: 1040, // Asegúrate de que el overlay esté detrás del modal
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo para el overlay
          },
        }}
      >
        <h2>Nuevo Booking</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Usuario:</label>
          <input
            type="text"
            value={newBooking.user}
            onChange={(e) => handleInputChange('user', e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Alojamiento:</label>
          <Select
            options={accommodations}
            onChange={(option) => handleInputChange('accomodation_id', option.value)}
            placeholder="Selecciona un alojamiento"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Fecha de Check-in:</label>
          <input
            type="date"
            value={newBooking.check_in_date}
            onChange={(e) => handleInputChange('check_in_date', e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Fecha de Check-out:</label>
          <input
            type="date"
            value={newBooking.check_out_date}
            onChange={(e) => handleInputChange('check_out_date', e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Monto Total:</label>
          <input
            type="number"
            value={newBooking.total_amount}
            onChange={(e) => handleInputChange('total_amount', e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <button
          onClick={createBooking}
          style={{
            backgroundColor: '#10B981',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Guardar
        </button>
        <button
          onClick={() => setModalIsOpen(false)}
          style={{
            backgroundColor: '#EF4444',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
        >
          Cancelar
        </button>
      </Modal>

      <div style={{ height: "90vh", paddingRight: "3rem", paddingTop: "4rem" }}>
        <Calendar
          localizer={localizer}
          events={events}
          views={["month", "week", "day"]}
          components={components}
        />
      </div>
    </div>
  );
}

export default CalendarBooking;
