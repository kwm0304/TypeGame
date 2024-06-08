import useSignalRConnection from "@/services/signalRService"
import React from "react"

const Tournament: React.FC = () => {
  const connection = useSignalRConnection("http://localhost:5214/tournament")
  return (
    <div>Tournament</div>
  )
}

export default Tournament