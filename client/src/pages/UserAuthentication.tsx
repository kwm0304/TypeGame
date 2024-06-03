import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const UserAuthentication = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-monkeyBG">
      {!loggedIn ? (
        <div className="flex items-stretch space-x-10 w-full max-w-3xl gap-x-20">
          <SignupForm Username={""} Password={""} Email={""} Name={""} />
          <LoginForm Username={""} Password={""} />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to MonkeyType{" "}
            <span className="text-monkeyAccent">{user?.userName}</span>
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
