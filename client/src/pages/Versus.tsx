import useSignalRConnection from "@/services/signalRService";
import React, { useEffect, useState } from "react";

const Versus: React.FC = () => {
  const connection = useSignalRConnection("/versus");
  const [gameInfo, setGameInfo] = useState<{ player1Id: string, player2Id: string } | null>(null);
  console.log("connection: ", connection)
  useEffect(() => {
    if (connection) {
      connection.on("GameStarted", (player1Id, player2Id) => {
        console.log(`Game started between , ${player1Id} and ${player2Id}`)
        setGameInfo({ player1Id, player2Id });
      })
    }
  }, [connection])
  return (
    <div className="w-full min-h-screen bg-monkeyBG">
      {gameInfo && (
        <div>
          Game started between {gameInfo.player1Id} & {gameInfo.player2Id}
        </div>
      )}
    </div>
  )
};

export default Versus;
