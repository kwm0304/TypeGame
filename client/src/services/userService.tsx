import { Token } from "@/types";
import axios from "axios";

const baseUrl = "http://localhost:5214/api/Player";

export const login = async (username: string, password: string) => {
  try {
    const data = await axios.post<Token>(
      `${baseUrl}/login`,
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
    return data;
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
    const data = await axios.post<Token>(
      `${baseUrl}/register`,
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
    return data;
  } catch (error) {
    console.error(error);
  }
};
