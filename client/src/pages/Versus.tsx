import React, {
  useReducer,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { SignalRService } from "@/services/signalRService";
import { gameReducer } from "@/context/GameReducer";
import { useAuth } from "@/context/AuthContext";
import { initialState, GameState, Action, TextUpdate } from "@/types";
import PlayerContainer from "@/components/PlayerContainer";
import Timer from "@/components/Timer";
import { useGame } from "@/context/GameContext";
import MultiplayerResults from "./MultiplayerResults";

const Versus = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [state, dispatch] = useReducer<React.Reducer<GameState, Action>>(
    gameReducer,
    initialState
  );
  const { setCurrentGameText, handleKeyDown, correct, timeLeft, calculateAccuracy, calculateWPM, countErrors } = useGame();
  const [gameText, setGameText] = useState(state.content);
  const [oppGameText, setOppGameText] = useState(state.content);
  const [oppCorrect, setOppCorrect] = useState<(boolean | null)[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [winner, setWinner] = useState("");
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const signalRServiceRef = useRef<SignalRService | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
    }
  }, [user]);

  useEffect(() => {
    if (username) {
      signalRServiceRef.current = new SignalRService(username, dispatch);
      signalRServiceRef.current.createGameConnection();
      const connection = signalRServiceRef.current.getConnection();

      connection?.on("ReceiveUpdate", (update: TextUpdate) => {
        handleReceiveUpdate(update);
      });
      return () => {
        signalRServiceRef.current?.endGame();
      };
    }
  }, [username, dispatch]);

  useEffect(() => {
    setGameText(state.content);
    setCurrentGameText(gameText);
    setOppGameText(state.content);
  }, [state.content]);

  const handleSendUpdate = useCallback((update: TextUpdate) => {
    signalRServiceRef.current?.sendUpdate(
      update.Sender,
      update.Receiver,
      update.Update,
      update.IsGameActive
    );
  }, []);

  const bothComplete = () => {
    if (correct.every(val => val !== null) && oppCorrect.every(val => val !== null)) {
      return true;
    }
    return false;
  }

  const handleGameOver = () => {
    if (timeLeft === 0 || bothComplete()) {
      handleCalculations();
      handleResetLocalGameState();
      handleResetGameContextState();
      signalRServiceRef.current?.endGame();
    } 
  }

  useEffect(() => {
    handleGameOver();
  }, [timeLeft, correct, oppCorrect]);

  const handleResetGameContextState = () => {
    //need to pass in opp end of game calculations in signalr function for multiplayerresults props
    //need gameService function to send multiplayer results
    const remainingTime = timeLeft === 0 ? 60000 : 60000 - timeLeft;
    setWpm(calculateWPM(remainingTime));
    setAccuracy(Number(calculateAccuracy()));
    setTime(remainingTime);
    setIsActive(false);
  }

  const handleResetLocalGameState = () => {

  }

  function handleCalculations() {
    
  }

  const handleReceiveUpdate = useCallback((update: TextUpdate) => {
    setOppCorrect(update.Update);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      handleKeyDown(e as unknown as React.KeyboardEvent);
      const update: TextUpdate = {
        Sender: username,
        Receiver: state.player2 ? state.player2 : "no player found",
        Update: correct,
        IsGameActive: isActive,
      };
      handleSendUpdate(update);
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    handleKeyDown,
    handleSendUpdate,
    isActive,
    correct,
    username,
    state.player2,
  ]);

  return (
    <div className="w-full min-h-screen">
      <Timer />
      {isActive ? (
        <div className="grid grid-rows-2 w-full h-full">
          <PlayerContainer
            playerId={state.player1}
            text={gameText}
            playerArr={correct}
          />
          <PlayerContainer
            playerId={state.player2}
            text={oppGameText}
            playerArr={oppCorrect}
          />
        </div>
      ) : (
        <MultiplayerResults 
        oppUsername={state.player2}
        username={username}
        oppWpm={oppWpm}
        wpm={wpm}
        accuracy={accuracy}
        oppAccuracy={oppAccuracy}
        errors={errors}
        oppErrors={oppErrors}
        wins={wins}
        oppWins={oppWins}
        losses={losses}
        oppLosses={oppLosses}
        time={time}
        oppTime={oppTime}
        />
      )}
    </div>
  );
};

export default Versus;