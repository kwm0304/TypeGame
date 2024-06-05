import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import Timer from "@/components/Timer";

const SinglePlayer = () => {
  const {
    text,
    currentIndex,
    correct,
    handleKeyDown,
    countErrors,
    calculateAccuracy,
    calculateWPM,
    timeLeft,
    resetGame,
    activeGame,
    setActiveGame,
  } = useGame();
  const navigate = useNavigate();

  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const initializedGame = async () => {
      await resetGame();
      setAccuracy(0);
      setWpm(0);
      setErrors(0);
      setTime(60000);
    };
    initializedGame();
  }, [])
  const handleGameOver = () => {
    const remainingTime = timeLeft === 0 ? 60000 : 60000 - timeLeft;

    const calculatedWPM = calculateWPM(remainingTime);
    const calculatedAccuracy = calculateAccuracy();
    const calculatedErrors = countErrors();
    const calculatedTime = remainingTime;

    setWpm(calculatedWPM);
    setAccuracy(Number(calculatedAccuracy));
    setErrors(calculatedErrors);
    setTime(calculatedTime);
    setActiveGame(false);

    navigate('/results', {
      state: {
        accuracy: Number(calculatedAccuracy),
        wpm: calculatedWPM,
        errors: calculatedErrors,
        time: calculatedTime,
      },
    });
  };


  useEffect(() => {
    if ((currentIndex === text.length || timeLeft === 0) && activeGame) {
      handleGameOver();
    }
  }, [currentIndex, text, timeLeft, activeGame]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      handleKeyDown(e as unknown as React.KeyboardEvent);
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-monkeyBG">
      <div className="w-full">
        <Timer />
      </div>
      <div className="w-full flex flex-wrap items-center justify-center text-monkeyDarkText pb-44 px-44 font-reddit-mono text-3xl break-words font-semibold leading-loose">
        {text.split("").map((char, i) => {
          let className = "text-monkeyDarkText";
          if (correct[i] === true) {
            className = "text-white";
          } else if (correct[i] === false) {
            className = "text-red-500";
          }
          return (
            <span key={i} className={className}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SinglePlayer;
