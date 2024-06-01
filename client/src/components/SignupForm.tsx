

const SignupForm = () => {
  return (
    <div className="font-reddit-mono ">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="border border-gray-300 rounded-md p-6 px-16 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-monkeyText">
          <form className="space-y-6">
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold text-monkeyBG">Sign Up</h3>
            </div>
            <div>
              <label className="text-md font-medium mb-2 block">
                Name
              </label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full text-sm border border-gray-300 pl-4 pr-10 py-3 rounded-md outline-[#333] bg-darkerBG font-medium text-monkeyAccent"
                  placeholder="Enter name"
                />
              </div>
            </div>
            <div>
              <label className="text-md font-medium mb-2 block">
                Username
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-sm border border-gray-300 pl-4 pr-10 py-3 rounded-md outline-[#333] bg-darkerBG font-medium text-monkeyAccent"
                  placeholder="Enter username"
                />
              </div>
            </div>
            <div>
              <label className="text-md font-medium mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full text-sm border border-gray-300 pl-4 pr-10 py-3 rounded-md outline-[#333] bg-darkerBG font-medium text-monkeyAccent"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div>
              <label className="text-md font-medium mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm border border-gray-300 pl-4 pr-10 py-3 rounded-md outline-[#333] bg-darkerBG font-medium text-monkeyAccent"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div>
              <label className="text-md font-medium mb-2 block">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full text-sm border border-gray-300 pl-4 pr-10 py-3 rounded-md outline-[#333] bg-darkerBG font-medium text-monkeyAccent"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm font-medium"
                >
                  Remember me
                </label>
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
              Already have an account?{" "}
              <a
                href="javascript:void(0);"
                className="text-darkerBG hover:underline font-bold"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupForm