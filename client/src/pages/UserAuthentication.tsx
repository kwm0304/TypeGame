import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const UserAuthentication = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-monkeyBG">
      <div className="flex items-stretch space-x-10 w-full max-w-3xl gap-x-20">
          <SignupForm />
        
          <LoginForm />
      </div>
    </div>
  );
};

export default UserAuthentication;
