import { useAuth } from "@/context/AuthContext";
import { LoginFormProps } from "@/types";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
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
    <div className="font-reddit-mono ">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-monkeyText">
          <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold text-monkeyBG">Sign In</h3>
            </div>
            <div>
              <label className="text-md font-medium mb-2 block">
                User name
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-sm border border-gray-300 pl-4 pr-10 py-3 rounded-md outline-[#333] bg-darkerBG font-medium"
                  placeholder="Enter user name"
                  onChange={handleChange}
                />
                <FaUser className="absolute right-3 text-monkeyText" />
              </div>
            </div>
            <div>
              <label className="text-md font-medium mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm border border-gray-300 pl-4 pr-10 py-3 rounded-md outline-[#333] bg-darkerBG font-medium"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
                <IoEye className="absolute right-3 text-monkeyText hover:cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onChange={handleChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm font-medium"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm font-medium">
                <a
                  href="jajvascript:void(0);"
                  className="text-darkerBG hover:underline font-bold"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-lg font-extrabold rounded bg-monkeyAccent text-monkeyBG  hover:bg-monkeyBG hover:text-monkeyAccent focus:outline-none"
              >
                Log in
              </button>
            </div>
            <p className="text-sm !mt-10 text-center font-medium">
              Don't have an account{" "}
              <a
                href="javascript:void(0);"
                className="text-darkerBG hover:underline font-bold"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
