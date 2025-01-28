import axios from "axios";

const token = sessionStorage.getItem("api-token");

const bookingGet = async () => {
  try {
    const response = await axios.get(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      
    );
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error("Error obteniendo bookings:", error);
    return [];
  }
};

export default bookingGet;
