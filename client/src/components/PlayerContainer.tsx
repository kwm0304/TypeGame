import React from "react";
import { useGame } from "@/context/GameContext";

interface PlayerContainerProps {
  playerId: string | null;
  player: string; // 'player1' or 'player2'
  handleKeyPress: (e: KeyboardEvent, player: string) => void;
}

const PlayerContainer: React.FC<PlayerContainerProps> = ({
  playerId,
  player,
  handleKeyPress,
}) => {
  const { text, correct } = useGame();

  if (playerId === null) {
    return null;
  }

  return (
    <div
      className="w-full px-48"
      tabIndex={0}
      onKeyDown={(e) => handleKeyPress(e as unknown as KeyboardEvent, player)}
    >
      <h2 className="text-monkeyAccent font-bold text-xl">{playerId}</h2>
      <div className="w-full text-monkeyText text-xl flex flex-wrap items-center justify-center pb-44 px-44 font-reddit-mono text-3xl break-words font-semibold leading-loose">
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

export default PlayerContainer;
