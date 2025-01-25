import axios from "axios";

const loginPoint = async (user) => {
  try {
    const response = await axios.post(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/login",
      user
    );
    return response.data;
  } catch (error) {
    console.error(`can't log in`, error);
  }
};

export default loginPoint;
