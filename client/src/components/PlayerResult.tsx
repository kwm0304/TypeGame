import React from "react";

interface PlayerResultProps {
  username: string;
  wpm: number;
  time: number;
  accuracy: number;
  errors: number;
  wins: number;
  losses: number;
}
const PlayerResult: React.FC<PlayerResultProps> = ({ username, wpm, time, accuracy, errors, wins, losses }) => {
  return (
    <div className="h-full w-full flex items-center justify-center h-full gap-x-24 text-4xl">
      <h1 className="">{username}</h1>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <p className="text-white font-semibold ">{wpm}</p>
        <p className="font-bold">WPM</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <p className="text-white font-semibold ">{time}</p>
        <p className="font-bold">Time</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <p className="text-white font-semibold ">{accuracy}%</p>
        <p className="font-bold">Accuracy</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <p className="text-white font-semibold ">{errors}</p>
        <p className="font-bold">Errors</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <p className="text-white font-semibold ">{wins}-{losses}</p>
        <p className="font-bold">Record</p>
      </div>
      
    </div>
  );
};

export default PlayerResult;
