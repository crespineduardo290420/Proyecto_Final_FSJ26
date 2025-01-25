import axios from "axios";

const token = sessionStorage.getItem("api-token");

const accommodationGetById = async (id) => {
  try {
    const response = await axios.get(
      `https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id}`,
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

export default accommodationGetById;
