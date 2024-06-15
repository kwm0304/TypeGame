import PlayerResult from "@/components/PlayerResult";

const MultiplayerResults = () => {
  return (
    <div className="w-full h-full bg-monkeyBG">
      <div className="grid grid-rows-2 w-full h-full font-reddit-mono text-monkeyAccent">
        <PlayerResult />
        <PlayerResult />
      </div>
    </div>
  );
};

export default MultiplayerResults;
