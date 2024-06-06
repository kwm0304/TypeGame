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

export const submitGameResults = async (
  username: string,
  time: number,
  wpm: number,
  accuracy: number
) => {
  try {
    const formattedTime = time/1000;
    console.log("TIME: ", formattedTime)
    const response = await axios.post(
      `api/game/v1?username=${username}`,
      {
        WinnerTime: formattedTime,
        WordsPerMinute: wpm,
        Accuracy: accuracy
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log("GAME RES ", response);
    console.log("GAME RES STATUS ", response.status);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
