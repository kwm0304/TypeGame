import axios from "axios";
const baseUrl = "http://localhost:5214/api";

export const getGameText = async () => {
  try {
    const response = await axios.get(`${baseUrl}/game/v1`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("RES ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
