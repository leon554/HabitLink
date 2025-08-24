import { useState, useEffect, useContext } from "react";
import { Link, useLocation} from "react-router-dom";
import { userContext } from "./UserProvider";
import { FaHome } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { LuCirclePlus, LuLogOut } from "react-icons/lu";

export function Navbar() {
  const location = useLocation();
  const User = useContext(userContext);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function logout() {
    User.accessToken = "";
    User.setLoggedIn(false)
    User.setHabits([])
    localStorage.removeItem("refreshToken");
  }

  function showBtns() {
    const pathName = location.pathname;

    if (pathName === "/" || pathName === "/signin" || pathName === "/login") {
      return (
        <Link to="/login">
          <button className="flex items-center justify-center gap-1.5 hover:bg-white hover:text-slate-900 p-4 hover:cursor-pointer duration-200 ease-in-out">
            <LuLogOut size={15} /> Log In
          </button>
        </Link>
      );
    } else {
      return (
        <div
          className="flex"
          style={{
            gap: isSmallScreen ? "15px" : "",
            marginRight: isSmallScreen ? "10px" : "",
          }}>
          <Link to="/home">
            <button className="hover:bg-white hover:text-slate-900 p-4 hover:cursor-pointer duration-200 ease-in-out max-sm:text-sm max-sm:pr-2 max-sm:pl-2 flex items-center gap-1.5">
              <FaHome size={16} />
              {!isSmallScreen && "Dashboard"}
            </button>
          </Link>
          <Link to="/log">
            <button className="flex items-center justify-center gap-1.5 hover:bg-white hover:text-slate-900 p-4 hover:cursor-pointer duration-200 ease-in-out max-sm:text-sm max-sm:pr-2 max-sm:pl-2">
              <FaChartLine size={15} />
              {!isSmallScreen && "Log"}
            </button>
          </Link>
          <Link to="/newhabit">
            <button className="flex items-center justify-center gap-1.5 hover:bg-white hover:text-slate-900 p-4 hover:cursor-pointer duration-200 ease-in-out max-sm:text-sm max-sm:pr-2 max-sm:pl-2">
              <LuCirclePlus size={15} />
              {!isSmallScreen && "New Habit"}
            </button>
          </Link>
          <Link to="/">
            <button
              className="flex items-center justify-center gap-1.5 hover:bg-white hover:text-slate-900 p-4 hover:cursor-pointer duration-200 ease-in-out max-sm:text-sm max-sm:pr-2 max-sm:pl-2"
              onClick={() => logout()}>
              <LuLogOut size={15} />
              {!isSmallScreen && "Log Out"}
            </button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="bg-green-700 text-white flex items-center fixed top-0 left-0 w-full z-40 p-0">
      <h1 className="font-bold text-2xl m-3 max-sm:text-xl">Correlink</h1>
      <div className="flex-1 flex justify-end h-full">{showBtns()}</div>
    </div>
  );
}
