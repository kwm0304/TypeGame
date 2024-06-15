import { Link } from "react-router-dom";

const ChooseGameType = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-monkeyBG">
      <div className="flex gap-4 pb-24 font-bold text-darkerBG text-2xl">
        <Link to="/">
          <button className="bg-monkeyAccent w-48 h-24 rounded-xl hover:scale-110 hover:text-monkeyAccent hover:bg-darkerBG">
            SINGLE PLAYER
          </button>
        </Link>
        <Link to="/games/1v1">
        <button className="bg-monkeyAccent w-48 h-24 rounded-xl hover:scale-110 hover:text-monkeyAccent hover:bg-darkerBG">
          1 V 1
        </button>
        </Link>
        {/* <Link to="/games/tournament">
        <button className="bg-monkeyAccent w-48 h-24 rounded-xl hover:scale-110 hover:text-monkeyAccent hover:bg-darkerBG">
          TOURNAMENT
        </button>
        </Link> */}
      </div>
    </div>
  );
};

export default ChooseGameType;
