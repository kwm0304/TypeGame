import axios from "axios";


export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      "api/player/login",
      {
        Username: username,
        Password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const signup = async (
  Email: string,
  Username: string,
  Password: string,
  Name: string
) => {
  try {
    const response = await axios.post(
      "api/player/register",
      {
        Email: Email,
        Username: Username,
        Password: Password,
        Name: Name,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
