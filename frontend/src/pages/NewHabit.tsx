import { useContext, useEffect, useState } from "react";
import Switch from "../components/Switch";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { userContext } from "../components/UserProvider";
import { motion } from "motion/react";

export default function NewHabit() {
  const [name, setName] = useState("");
  const [numeric, setNumeric] = useState(false);
  const [colorIndex, setColorIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const colors = [
    "#b91c1c",
    "#c2410c",
    "#a16207",
    "#4d7c0f",
    "#15803d",
    "#047857",
    "#0f766e",
    "#0e7490",
    "#0369a1",
    "#1d4ed8",
    "#4338ca",
    "#6d28d9",
    "#7e22ce",
    "#a21caf",
    "#be185d",
    "#9d174d",
  ];
  const navigate = useNavigate();
  const User = useContext(userContext);
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken == null) {
      navigate("/signin");
      return;
    }
  }, []);

  function createHabit() {
    if (name == "" || colorIndex == -1) {
      alert("Habit name or color unspecified");
      return;
    }
    setLoading(true);

    const create = async () => {
      const logInRes = await User.login(localStorage.getItem("refreshToken")!);
      if (!logInRes.loggedIn) {
        navigate("/signin");
        return;
      }
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/createhabit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logInRes.accessToken}`,
        },
        body: JSON.stringify({
          name: name,
          color: colors[colorIndex],
          numeric: numeric,
        }),
      });
      if (res.status == 201) {
        const res = await getHabitRes(logInRes.accessToken);
        if (res.status == 200) {
          User.setHabits([...(await res.json())]);
        }
        setLoading(false);
        navigate("/home");
      }else if(res.status === 206) {
        alert("Can't edit data in sample data mode click logout and create a acount to edit data")
        setLoading(false);
      } else if (res.status == 401) {
        setLoading(false);
        alert("habit allready exists");
      } else {
        setLoading(false);
        alert("Server error");
      }
    };
    create();
  }
  async function getHabitRes(accessToken: string) {
    return await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/habits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-auto flex justify-center  mt-30 max-[460px]:mt-20"
    >
      <div className="border-3 rounded-md shadow-[6px_6px_0px_#008236] p-6 bg-white flex flex-col justify-center items-center max-w-[400px] w-[90%]">
        <h1 className="text-2xl font-bold font-sans">Create a new habit</h1>
        <br />
        <form className="flex flex-col w-full">
          <label className="text-sm font-medium" htmlFor="habitname">
            Habit Name
          </label>
          <input
            className="border-1 rounded-sm p-1 border-slate-400 text-sm mt-2"
            type="habitname"
            name="habitname"
            id="habitname"
            placeholder="e.g Gym"
            value={name}
            onChange={(e) => (e.target.value.length <= 15) ? setName(e.target.value) : ""}
          />
          <div className="flex justify-between mt-0.5 mb-0 pr-1">
            <p className="text-[12px] text-gray-600">Give your habit a clear, concise name</p>
            <p className="text-[12px] text-gray-600">{name.length}/15</p>
          </div>

          <label
            className="text-sm font-medium mt-3 mb-1.5"
            htmlFor="repassword"
          >
            Color
          </label>
          <div className="flex flex-wrap gap-2 ">
            {colors.map((c, i) => {
              return (
                <div
                  className={`w-8 h-8 rounded-sm hover:cursor-pointer grid-flow-row`}
                  style={{
                    backgroundColor: c,
                    border: `${i === colorIndex ? "solid 1px black" : ""}`,
                  }}
                  onClick={() => setColorIndex(i)}
                ></div>
              );
            })}
          </div>

          <label className="text-sm font-medium mb-1.5 mt-4" htmlFor="password">
            Numeric
          </label>
          <Switch ticked={false} setStatus={setNumeric} />

          <button
            className="bg-green-700 rounded-md mt-5 p-2 font-semibold text-white text-sm hover:cursor-pointer hover:bg-green-800 transition delay-50 duration-300 ease-in-out flex justify-center h-9"
            type="button"
            onClick={() => createHabit()}
          >
            {`${loading ? " " : "Create Habit"}`}
            <AiOutlineLoading
              className="animate-spin"
              style={{ display: !loading ? "none" : "" }}
            />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
