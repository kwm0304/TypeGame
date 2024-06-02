import { getGameText } from "@/services/gameTextService";
import { useEffect, useState } from "react";

const SinglePlayer = () => {
  const [text, setText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correct, setCorrect] = useState<(boolean | null)[]>([]);

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
    const handleKeyPress = (e: KeyboardEvent) => {
      handleKeyDown(e as unknown as React.KeyboardEvent);
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex, text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-monkeyBG">
      <div className="w-full flex flex-wrap items-center justify-center text-monkeyDarkText pb-44 px-10 font-reddit-mono text-3xl break-words font-semibold leading-loose">
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
      <div className="mt-4">
        <p>Errors: {countErrors()}</p>
      </div>
    </div>
  );
};

export default SinglePlayer;
