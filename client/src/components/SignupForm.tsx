import { useAuth } from "@/context/AuthContext";
import { SignUpFormProps } from "@/types";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const SignupForm: React.FC<SignUpFormProps> = () => {
  const { register } = useAuth();
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formData, setFormData] = useState<SignUpFormProps>({
    Username: "",
    Email: "",
    Password: "",
    Name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.Email === confirmEmail &&
      formData.Password === confirmPassword
    ) {
      register(
        formData.Email,
        formData.Username,
        formData.Password,
        formData.Name
      );
    } else {
      console.log("Email or Password do not match");
    }
  };

  return (
    <div className="flex-1 p-6 rounded-md flex flex-col justify-between font-reddit-mono w-72">
      <h2 className="text-md font-medium text-white mb-4">register</h2>
      <form className="space-y-4" onSubmit={handleSignup}>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
          value={formData.Name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Username"
          placeholder="Username"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
          value={formData.Username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
          value={formData.Email}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Verify Email"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
          value={formData.Password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Verify Password"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full py-2 bg-darkerBG text-white rounded-md"
          >
            <FaUserPlus className="inline mr-2 mb-1" />
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
