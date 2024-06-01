import axios from "axios";
const baseUrl = "http://localhost:5214";

export const getGameText = async () => {
  try {
    const response = await axios.get(`${baseUrl}/v1`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
