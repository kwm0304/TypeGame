import PlayerResult from "@/components/PlayerResult";

const MultiplayerResults = (
  oppUsername: string,
  username: string,
  oppWpm: number,
  wpm: number,
  accuracy: number,
  errors: number,
  wins: number,
  losses:number,
  time: number,
  oppAccuracy: number,
  oppErrors: number,
  oppWins: number,
  oppLosses: number,
  oppTime: number
) => {
  return (
    <div className="w-full h-full bg-monkeyBG">
      <div className="grid grid-rows-2 w-full h-full font-reddit-mono text-monkeyAccent">
        <PlayerResult username={username} wpm={wpm} accuracy={accuracy} errors={errors} wins={wins} losses={losses} time={time} />
        <PlayerResult username={oppUsername} wpm={oppWpm} accuracy={oppAccuracy} errors={oppErrors} wins={oppWins} losses={oppLosses} time={oppTime} />
      </div>
    </div>
  );
};

export default MultiplayerResults;
