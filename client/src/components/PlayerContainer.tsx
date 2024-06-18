import React from "react";

interface PlayerContainerProps {
  playerId: string | null;
  text: string;
  playerArr: (boolean | null)[];
}

const PlayerContainer: React.FC<PlayerContainerProps> = ({ playerId,text, playerArr}) => {

  return (
    <div className="w-full flex flex-wrap items-center justify-center text-monkeyDarkText pb-44 px-44 font-reddit-mono text-3xl break-words font-semibold leading-loose">
      <h2 className="text-monkeyAccent font-bold text-xl">{playerId}</h2>
      <div className="w-full text-monkeyText text-xl flex flex-wrap items-center justify-center pb-44 px-44 font-reddit-mono text-3xl break-words font-semibold leading-loose">
        {text.split("").map((char, i) => {
          let className = "text-monkeyDarkText";
          if (playerArr[i] === true) {
            className = "text-white";
          } else if (playerArr[i] === false) {
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
