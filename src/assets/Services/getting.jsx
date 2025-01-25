import axios from "axios";

const token = sessionStorage.getItem("api-token");

const accommodationGet = async () => {
  try {
    const response = await axios.get(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations",
      {
        headers: {
          Authorization:
            "Bearer 977|jjNjmChzJGriia5h0n4sxEJ3wWRX7DAuHxz9qzlMed9ba9f8",
          // `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("No accommodation found", error);
  }
};

export default accommodationGet;
