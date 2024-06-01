import LoginForm from "@/components/LoginForm";
const Login = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-monkeyBG">
        <div className="flex flex-col justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
export default Login