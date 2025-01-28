import axios from "axios";

const token = sessionStorage.getItem("api-token");

const bookingPatch = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `https://apibookingsaccomodations-production.up.railway.app/api/V1/status_booking/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando booking con ID ${id}:`, error);
    throw error;
  }
};

export default bookingPatch;
