import useSignalRConnection from "@/services/signalRService";
import React, { useEffect, useState } from "react";

const Versus: React.FC = () => {
  const connection = useSignalRConnection("/versus");
  const [gameInfo, setGameInfo] = useState<{ player1Id: string, player2Id: string, gameText: string } | null>(null);
  console.log("connection: ", connection)
  useEffect(() => {
    if (connection) {
      connection.on("GameStarted", (player1Id, player2Id, gameText) => {
        console.log(`Game started between , ${player1Id} and ${player2Id}`)
        setGameInfo({ player1Id, player2Id, gameText });
      })
    }
  }, [connection])
  return (
    <div className="w-full min-h-screen bg-monkeyBG">
      {gameInfo && (
        <>
        <div>
          Game started between {gameInfo.player1Id} & {gameInfo.player2Id}
        </div>
        <div className="w-full text-monkeyText">
          {gameInfo?.gameText}
        </div>
        </>
      )}
    </div>
  )
};

export default Versus;