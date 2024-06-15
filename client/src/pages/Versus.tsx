import React, { useReducer, useEffect, useState, useRef } from "react";
import { SignalRService } from "@/services/signalRService";
import { gameReducer } from "@/context/GameReducer";
import { useAuth } from "@/context/AuthContext";
import { initialState, GameState, Action } from "@/types";
import PlayerContainer from "@/components/PlayerContainer";
import Timer from "@/components/Timer";

const Versus = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [state, dispatch] = useReducer<React.Reducer<GameState, Action>>(
    gameReducer,
    initialState
  );
  const [gameText, setGameText] = useState(state.content);
  const [oppGameText, setOppGameText] = useState(state.content);
  const signalRServiceRef = useRef<SignalRService | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
    }
  }, [user]);

  useEffect(() => {
    console.log("username", username);
    if (username) {
      signalRServiceRef.current = new SignalRService(username, dispatch);
      signalRServiceRef.current.createGameConnection();
      return () => {
        signalRServiceRef.current?.endGame();
      };
    }
  }, [username, dispatch]);
  console.log("STATE: ", state);

  useEffect(() => {
    setGameText(state.content);
    setOppGameText(state.content);
  }, [state.content]);

  // const handleSendUpdate = (update: TextUpdate) => {
  //   signalRServiceRef.current?.sendUpdate(update);
  // };
  //TODO: handleKeyDown will call handleSendUpdate
  return (
    <div className="w-full min-h-screen">
      <Timer />
    <div className="grid grid-rows-2 w-full h-full">
      <PlayerContainer playerId={state.player1} text={gameText}/>
      <PlayerContainer playerId={state.player2} text={oppGameText} />
    </div>
    </div>
  );
};

export default Versus;
