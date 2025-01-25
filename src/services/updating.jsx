import axios from "axios";

const token = sessionStorage.getItem("api-token");

const accommodationPut = async (id, place) => {
  try {
    const response = await axios.put(
      `https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id}`,
      place,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("No accommodation found", error);
  }
};

export default accommodationPut;
