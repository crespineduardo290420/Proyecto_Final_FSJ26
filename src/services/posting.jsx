import axios from "axios";

const token = sessionStorage.getItem("api-token");

const accommodationPost = async (place) => {
  try {
    const response = await axios.post(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation",
      place,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("No place found", error);
  }
};

export default accommodationPost;
