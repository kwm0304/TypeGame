import { useEffect } from "react";
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
  } = useGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      handleKeyDown(e as unknown as React.KeyboardEvent);
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex, text, handleKeyDown]);

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
      <div className="mt-4 text-white text-center">
        <p>Errors: {countErrors()}</p>
        <p>Accuracy: {calculateAccuracy()}</p>
        <p>WPM: {calculateWPM(60000)}</p>
      </div>
    </div>
  );
};

export default SinglePlayer;
