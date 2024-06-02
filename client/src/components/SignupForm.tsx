import { FaUserPlus } from "react-icons/fa";
const SignupForm = () => {
  return (
    <div className="flex-1 p-6 rounded-md flex flex-col justify-between font-reddit-mono w-72">
      <h2 className="text-md font-medium text-white mb-4">register</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
        />
        <input
          type="email"
          placeholder="Verify Email"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
        />
        <input
          type="password"
          placeholder="Verify Password"
          className="w-full px-3 py-2 rounded-md bg-darkerBG text-white"
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
