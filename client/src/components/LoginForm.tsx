import { useAuth } from "@/context/AuthContext";
import { LoginFormProps } from "@/types";
import React, { useState } from "react";
import { IoEnterOutline } from "react-icons/io5";

const LoginForm: React.FC<LoginFormProps> = () => {
  const { loginUser } = useAuth();
  const [loginFormData, setLoginFormData] = useState<LoginFormProps>({
    Username: "",
    Password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(loginFormData.Username, loginFormData.Password);
  };

  return (
    <div className="flex-1 p-6 rounded-md  justify-between w-72 font-reddit-mono min-h-full">
      <h2 className="text-md font-medium text-white mb-4">login</h2>
      <form className="space-y-4 " onSubmit={handleLogin}>
        <div className="grid grid-rows-2 justify-between items-between h-full gap-y-4">
          <div className="gap-y-4 w-72 flex flex-col">
            <input
              type="text"
              placeholder="Username"
              name="Username"
              value={loginFormData.Username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
            />
            <input
              type="password"
              placeholder="Password"
              name="Password"
              value={loginFormData.Password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
            />
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                className="h-4 w-4 text-monkeyAccent bg-darkerBG"
              />
              <span className="ml-2">Remember me</span>
            </label>
          </div>
          <div className="self-end pt-36">
            <button
              type="submit"
              className="w-full py-2 bg-darkerBG text-white rounded-md flex items-center justify-center "
            >
              <IoEnterOutline className="inline mr-2 text-lg font-extrabold" />
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
