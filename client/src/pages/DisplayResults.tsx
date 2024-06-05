import { DisplayResultsProps } from "@/types"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GrPowerReset } from "react-icons/gr";
const DisplayResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accuracy, wpm, errors, time } = location.state as DisplayResultsProps;

  const handleNewGame = () => {
    navigate("/");
  }
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-monkeyBG text-monkeyAccent">
      <h1>Results</h1>
      <h2>Accuracy: {accuracy}%</h2>
      <h2>WPM: {wpm}</h2>
      <h2>Errors: {errors}</h2>
      <h2>Time: {time / 1000} seconds</h2>
      <GrPowerReset className="text-5xl cursor-pointer" onClick={handleNewGame} />
    </div>
  )
}

export default DisplayResults