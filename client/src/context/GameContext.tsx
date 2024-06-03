import { getGameText } from "@/services/gameTextService";
import { GameContextProps } from "@/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correct, setCorrect] = useState<(boolean | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const gameText = await getGameText();
        const cleaned = gameText.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
        setText(cleaned);
        setCorrect(new Array(cleaned.length).fill(null));
      } catch (error) {
        console.error(error);
      }
    };
    fetchText();
  }, []);

  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timerStarted, timeLeft]);

  const startTimer = () => {
    setTimerStarted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!timerStarted) {
      startTimer();
    }
    const keyPressed = e.key.toLowerCase();
    if (keyPressed === "backspace") {
      undoLastKey();
    } else if (keyPressed.length === 1) {
      checkKey(keyPressed);
    }
  };

  const checkKey = (keyPressed: string) => {
    const updatedCorrectArr = [...correct];
    if (text[currentIndex] === keyPressed) {
      updatedCorrectArr[currentIndex] = true;
    } else {
      updatedCorrectArr[currentIndex] = false;
    }
    setCorrect(updatedCorrectArr);
    setCurrentIndex(currentIndex + 1);
  };

  const undoLastKey = () => {
    if (currentIndex > 0) {
      const updatedCorrectArr = [...correct];
      updatedCorrectArr[currentIndex - 1] = null;
      setCorrect(updatedCorrectArr);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const countErrors = () => {
    return correct.filter((isCorrect) => isCorrect === false).length;
  };

  const calculateAccuracy = () => {
    const correctChars = correct.filter(
      (isCorrect) => isCorrect === true
    ).length;
    const totalChars = correct.length;
    return ((correctChars / totalChars) * 100).toFixed(2);
  };

  const calculateWPM = (time: number) => {
    const minutes = time / 60000;
    const totalChars = text.length;
    const wpm = totalChars / 5 / minutes;
    return wpm.toFixed(2);
  };

  return (
    <GameContext.Provider
      value={{
        text,
        currentIndex,
        correct,
        setCurrentIndex,
        setCorrect,
        handleKeyDown,
        undoLastKey,
        countErrors,
        calculateAccuracy,
        calculateWPM,
        startTimer,
        timeLeft
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be in provider");
  }
  return context;
};
