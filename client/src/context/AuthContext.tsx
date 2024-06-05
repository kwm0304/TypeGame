import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContextType, UserProfile } from "../types";
import { useNavigate } from "react-router-dom";
import { signup, login } from "@/services/userService";

type Props = { children: React.ReactNode };
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const register = async (
    Email: string,
    Username: string,
    Password: string,
    Name: string
  ) => {
    await signup(Email, Username, Password, Name)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.token);
          const userObj = {
            userName: res?.username,
            email: res?.email,
            id: res?.userId,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token);
          setUser(userObj!);
          navigate("/");
        }
      })
      .catch((e) => console.error(e));
  };

  const loginUser = async (username: string, password: string) => {
    await login(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.token);
          const userObj = {
            userName: res?.username,
            email: res?.email,
            id: res?.userId,
          };
          if (res.status === 200) {
            window.alert("Login Successful");
          }
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token);
          setUser(userObj!);
          navigate("/");
        }
      })
      .catch(() => setErrMsg("Invalid Username and/or Password"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, register, errMsg }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
