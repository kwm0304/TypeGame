import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const UserAuthentication = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [username, setUsername] = useState("");
  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUsername(user?.userName || "");
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-monkeyBG">
      <h1 className="text-monkeyAccent py-6 text-center w-full">Logged in: {loggedIn ? "true" : "false"}</h1>
      {!loggedIn && !user ? (
        <div className="flex items-stretch space-x-10 w-full max-w-3xl gap-x-20">
          <SignupForm Username={""} Password={""} Email={""} Name={""} />
          <LoginForm Username={""} Password={""} />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to MonkeyType{" "}
            <span className="text-monkeyAccent">{username}</span>
          </h1>
          <div className="pt-6">
            <button
              onClick={handleLogout}
              className="bg-monkeyAccent px-8 text-xl py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuthentication;
