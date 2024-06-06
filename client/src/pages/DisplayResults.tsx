import { DisplayResultsProps } from "@/types"
import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GrPowerReset } from "react-icons/gr";
import { useAuth } from "@/context/AuthContext";
import { submitGameResults } from "@/services/gameTextService";
const DisplayResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accuracy, wpm, errors, time } = location.state as DisplayResultsProps;
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    console.log("Inside useEffect");
    if (isLoggedIn() || user) {
      console.log("User is defined:", user);
      const username = user?.userName;
      console.log("Calling submitGameResults with:", { username, time, wpm, accuracy });
      submitGameResults(username, time, wpm, accuracy)
        .then(response => {
          console.log("STATUS: ", response.status)
          console.log("DATA: ", response.data);

          console.log("Game results submitted successfully:", response);
        })
        .catch(error => {
          console.error("Error submitting game results:", error);
        });
    } else {
      console.log("User is not defined");
    }
  }, [accuracy, wpm, errors, time, user]);

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