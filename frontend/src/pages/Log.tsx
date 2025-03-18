import { useContext, useEffect, useState } from "react";
import { userContext } from "../components/UserProvider";
import { useNavigate } from "react-router-dom";
import HabitLog from "../components/HabitLog";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { motion } from "motion/react";

export default function Log() {
  const User = useContext(userContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const setup = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken == null) {
        navigate("/signup");
        return;
      }
      const loginRes = await User.login(refreshToken);
      if (!loginRes.loggedIn) {
        navigate("/signup");
        return;
      }
      if (User.habits != null) return;
      const res = await getHabitRes(loginRes!.accessToken);
      if (res.status == 200) {
        User.setHabits([...(await res.json())]);
      }
    };
    setup();
  }, []);
  async function getHabitRes(accessToken: string) {
    return await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/habits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  async function completeHabit(data: number, id: string) {
    const loginRes = await User.login(localStorage.getItem("refreshToken")!);
    if (!loginRes.loggedIn) {
      navigate("/signup");
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/completehabit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginRes.accessToken}`,
      },
      body: JSON.stringify({ data: data, date: Date.now(), id: id }),
    });
    if (res.status == 201) {
      const habitIndex = User.habits!.findIndex((h) => h._id == id);
      const habits = User.habits!;
      habits[habitIndex].completions.push({
        data: data,
        date: `${Date.now()}`,
        id: id,
      });
      User.setHabits([...habits]);
      return;
    } else if(res.status === 206) {
      alert("Can't edit data in sample data mode click logout and create a acount to edit data")
    }else {
      const d = await res.json();
      console.log(d.msg)
      navigate("/signup");
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col  items-center mt-30 max-sm:mt-20"
    >
      <div className="bg-white max-w-150 w-[90%] flex flex-col border-2 rounded-md p-5 gap-4 shadow-[6px_6px_0px_#008236] max-sm:mt-2">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-2xl font-bold mb-2 mt-2">Track Your Habits</h1>
          <h1 className="text-sm text-gray-700 mb-2">
            Log your daily habits and build consistency
          </h1>
        </div>

        <div className="flex outline-1 mb-2 outline-gray-400 items-center w-full justify-center rounded-md bg-white">
          <IoSearch className="ml-2" color="#99a1af" />
          <input
            type="text"
            placeholder="Search Habits..."
            className="w-full rounded-sm p-1 bg-white focus:outline-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="max-h-[50vh] overflow-y-scroll no-scrollbar pr-1.5 gap-5 flex flex-col pb-1.5">
          {User.habits?.map((h, _) => {
            if (!h.numeric && h.habitName.toLowerCase().includes(search)) {
              return (
                <div className="  break-inside-avoid-column">
                  <HabitLog
                    name={h.habitName}
                    numeric={h.numeric}
                    color={h.color}
                    id={h._id}
                    completeHabit={completeHabit}
                  />
                </div>
              );
            }
          })}
          {User.habits?.map((h, _) => {
            if (h.numeric && h.habitName.toLowerCase().includes(search)) {
              return (
                <div className="  break-inside-avoid-column">
                  <HabitLog
                    name={h.habitName}
                    numeric={h.numeric}
                    color={h.color}
                    id={h._id}
                    completeHabit={completeHabit}
                  />
                </div>
              );
            }
          })}
        </div>
        <button
          className=" flex justify-center p-1 rounded-md bg-green-700 hover:cursor-pointer hover mt- h-8 items-center hover:bg-green-800 duration-300 ease-in-out"
          onClick={() => navigate("/newhabit")}
        >
          <FaPlus color="ffffff" />
        </button>
      </div>
    </motion.div>
  );
}
