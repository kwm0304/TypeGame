import SignupForm from "@/components/SignupForm"

const Signup = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-monkeyBG">
        <div className="flex flex-col justify-center items-center">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default Signup