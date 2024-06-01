import { Token } from "@/types";
import axios from "axios";

const baseUrl = "http://localhost:5214/user";

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
  email: string,
  password: string,
  username: string,
  name: string
) => {
  try {
    const data = await axios.post<Token>(
      `${baseUrl}/register`,
      {
        Email: email,
        Password: password,
        Username: username,
        Name: name,
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
