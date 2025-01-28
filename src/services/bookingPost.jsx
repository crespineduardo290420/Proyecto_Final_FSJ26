import axios from "axios";

const token = sessionStorage.getItem("api-token");

const bookingPost = async (bookingData) => {
  try {
    const response = await axios.post(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/booking",
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creando booking:", error);
    throw error;
  }
};

export default bookingPost;
