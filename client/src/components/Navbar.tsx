import {
  FaCrown,
  FaInfoCircle,
  FaCog,
  FaBell,
  FaUser,
  FaKeyboard,
} from "react-icons/fa";
import { PiKeyboardBold } from "react-icons/pi";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-monkeyBG text-monkeyText flex items-center justify-between p-4 sticky top-0 fixed pt-6 px-48">
      <div className="flex items-center space-x-4 ">
        <div className="flex items-center space-x-2">
          <PiKeyboardBold className="text-monkeyAccent text-4xl" />
          <div className="relative">
            <span className="absolute top-0 left-0 text-xs text-monkeyDarkText">
              monkies see
            </span>
            <div className="text-white font-semibold text-3xl tracking-wider pb-2">monkiestype</div>
          </div>
        </div>
        <FaKeyboard className="text-monkeyDarkText text-lg" />
        <FaCrown className="text-monkeyDarkText text-lg" />
        <FaInfoCircle className="text-monkeyDarkText text-lg" />
        <FaCog className="text-monkeyDarkText text-lg" />
      </div>
      <div className="flex items-center space-x-4 ">
        <FaBell className="text-monkeyDarkText text-lg" />
        <Link to="/user">
          <FaUser className="text-monkeyDarkText text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
