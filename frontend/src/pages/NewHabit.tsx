import { useContext, useState } from "react";
import Switch from "../components/Switch";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { userContext } from "../components/UserProvider";
import { motion } from "motion/react";
import { AlertContext } from "../components/AlertProvider";

export default function NewHabit() {
  const [name, setName] = useState("");
  const [numeric, setNumeric] = useState(false);
  const [colorIndex, setColorIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("");
  const [customUnit, setCustomUnit] = useState("");
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
  const Alert = useContext(AlertContext)

  function createHabit() {
    if (name == "" || colorIndex == -1) {
      Alert.alert("Habit name or color unspecified");
      return;
    }
    setLoading(true);

    const create = async () => {
      const logInRes = await User.login(localStorage.getItem("refreshToken")!);
      if (!logInRes.loggedIn) {
        navigate("/signin");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/createhabit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logInRes.accessToken}`,
          },
          body: JSON.stringify({
            name: name,
            color: colors[colorIndex],
            numeric: numeric,
            unit: unit == "" ? customUnit : unit,
          }),
        }
      );
      if (res.status == 201) {
        const res = await getHabitRes(logInRes.accessToken);
        if (res.status == 200) {
          User.setHabits([...(await res.json())]);
        }
        setLoading(false);
        navigate("/home");
      } else if (res.status === 206) {
        Alert.alert(
          "Can't edit data in sample data mode click logout and create a acount to edit data"
        );
        setLoading(false);
      } else if (res.status == 401) {
        setLoading(false);
        Alert.alert("habit allready exists");
      } else {
        setLoading(false);
        Alert.alert("Server error");
      }
    };
    create();
  }
  async function getHabitRes(accessToken: string) {
    return await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/habits`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  return (
    <motion.div
      initial={{  y: 50 }}
      animate={{  y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-auto flex justify-center  mt-30 max-[460px]:mt-20">
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
            onChange={(e) =>
              e.target.value.length <= 15 ? setName(e.target.value) : ""
            }
          />
          <div className="flex justify-between mt-0.5 mb-0 pr-1">
            <p className="text-[12px] text-gray-600">
              Give your habit a clear, concise name
            </p>
            <p className="text-[12px] text-gray-600">{name.length}/15</p>
          </div>

          <label
            className="text-sm font-medium mt-3 mb-1.5"
            htmlFor="repassword">
            Color
          </label>
          <div className="grid gap-2 grid-cols-8 grid-rows-2">
            {colors.map((c, i) => (
              <div
                key={i}
                className="h-8 rounded-sm hover:cursor-pointer"
                style={{
                  backgroundColor: c,
                  border: i === colorIndex ? "solid 1px black" : "",
                }}
                onClick={() => setColorIndex(i)}></div>
            ))}
          </div>

          <label className="text-sm font-medium mb-1.5 mt-4" htmlFor="password">
            Numeric
          </label>
          <Switch ticked={false} setStatus={setNumeric} />

          <div
            className="mt-2 duration-500 ease-in-out"
            style={{
              display: numeric ? "" : "none",
            }}>
            <h1 className="text-sm font-medium mb-2 mt-3">Units</h1>
            <div className="flex gap-2.5 items-center max-[460px]:flex-col">
              <div className=" w-full flex gap-3 justify-stretch  ">
                <button
                  className="text-[12px] flex-1 text-gray-700 outline-1 p-1 rounded-md outline-gray-500 hover:cursor-pointer  hover:bg-gray-200"
                  type="button"
                  style={{
                    backgroundColor: unit == "km" ? "#d1d5dc" : "white",

                    outlineWidth: unit == "km" ? "0px" : "1px",
                    scale: unit == "km" ? "1.1" : "1",
                  }}
                  onClick={() => {
                    setUnit("km");
                    setCustomUnit("");
                  }}>
                  Km
                </button>
                <button
                  className="text-[12px] flex-1 text-gray-700 outline-1 p-1 rounded-md outline-gray-500 hover:cursor-pointer  hover:bg-gray-200"
                  type="button"
                  style={{
                    backgroundColor: unit == "hours" ? "#d1d5dc" : "white",

                    outlineWidth: unit == "hours" ? "0px" : "1px",
                    scale: unit == "hours" ? "1.1" : "1",
                  }}
                  onClick={() => {
                    setUnit("hours");
                    setCustomUnit("");
                  }}>
                  Hours
                </button>
                <button
                  className="text-[12px] flex-1 text-gray-700 outline-1 p-1 rounded-md outline-gray-500 hover:cursor-pointer  hover:bg-gray-200"
                  type="button"
                  style={{
                    backgroundColor: unit == "min" ? "#d1d5dc" : "white",

                    outlineWidth: unit == "min" ? "0px" : "1px",
                    scale: unit == "min" ? "1.1" : "1",
                  }}
                  onClick={() => {
                    setUnit("min");
                    setCustomUnit("");
                  }}>
                  Min
                </button>
                <button
                  className="text-[12px] flex-1 text-gray-700 outline-1 p-1 rounded-md outline-gray-500 hover:cursor-pointer  hover:bg-gray-200"
                  type="button"
                  style={{
                    backgroundColor: unit == "sec" ? "#d1d5dc" : "white",

                    outlineWidth: unit == "sec" ? "0px" : "1px",
                    scale: unit == "sec" ? "1.1" : "1",
                  }}
                  onClick={() => {
                    setUnit("sec");
                    setCustomUnit("");
                  }}>
                  Sec
                </button>
              </div>
              <div className="flex gap-3 items-center w-full justify-stretch">
                <p className="font-semibold text-sm ">or</p>
                <input
                  type="text"
                  className=" w-full outline-1 outline-gray-500 rounded-md text-[12px] p-1 text-gray-700"
                  placeholder="Enter Unit..."
                  onChange={(e) => {
                    setCustomUnit(e.target.value), setUnit("");
                  }}
                  maxLength={5}
                  value={customUnit}
                />
              </div>
            </div>
          </div>

          <button
            className="bg-green-700 rounded-md mt-5 p-2 font-semibold text-white text-sm hover:cursor-pointer hover:bg-green-800 transition delay-50 duration-300 ease-in-out flex justify-center h-9"
            type="button"
            onClick={() => createHabit()}>
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
