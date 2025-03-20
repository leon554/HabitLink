import { useContext, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Numeric from "./Numeric";
import Switch from "./Switch";
import { MdDeleteOutline } from "react-icons/md";
import { userContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { AlertContext } from "./AlertProvider";

interface HabitLogProps {
  name: string;
  numeric: boolean;
  color: string;
  unit: string
  id: string;
  completeHabit: (data: number, id: string) => void;
}
export default function HabitLog(props: HabitLogProps) {
  const [data, setData] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [edit, setEdit] = useState(false);
  const [numeric, setNumeric] = useState(props.numeric);
  const [name, setName] = useState("");

  const User = useContext(userContext);
  const Alert = useContext(AlertContext)
  const navigate = useNavigate();

  async function complete() {
    if (props.numeric && data === "") {
      Alert.alert("Click the + or - to set a value");
      return;
    }
    setLoading(true);
    await props.completeHabit(props.numeric ? Number(data) : 1, props.id);
    setData("0");
    setLoading(false);
  }

  async function updateHabit() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken === null) {
      navigate("/signup");
      return;
    }
    const loginRes = await User.login(refreshToken);
    if (!loginRes.loggedIn) {
      navigate("/signup");
      return;
    }
    setIsUpdating(true);
    const HabitName = name === "" ? props.name : name;

    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/updatehabit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginRes.accessToken}`,
        },
        body: JSON.stringify({
          color: props.color,
          name: HabitName,
          id: props.id,
          numeric: numeric,
        }),
      }
    );

    setIsUpdating(false);
    if (res.status === 206) {
      Alert.alert("Can't edit data in sample data mode click logout and create a acount to edit data")
      return;
    }
    if (res.status != 201) {
      Alert.alert("Server Errror");
      return;
    }

    UpdateHabitInMemory();
    setEdit(false);
  }

  function UpdateHabitInMemory() {
    const habits = User.habits;
    const currentHabit = habits?.find((h) => h.habitName == props.name);
    currentHabit!.habitName = name === "" ? props.name : name;
    currentHabit!.numeric = numeric;
    User.setHabits([...habits!]);
  }

  async function deleteHabit() {
    const refreshtoken = localStorage.getItem("refreshToken");
    if (refreshtoken === null) {
      navigate("/signup");
      return;
    }
    const loginRes = await User.login(refreshtoken);
    if (!loginRes.loggedIn) {
      navigate("/signup");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/deletehabit`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginRes.accessToken}`,
        },
        body: JSON.stringify({ id: props.id }),
      }
    );

    if (res.status === 201) {
      const habits = User.habits!.filter((h) => h.habitName != props.name);
      User.setHabits([...habits]);
    } else if (res.status === 206) {
      Alert.alert(
        "Can't edit data in sample data mode click logout and create a acount to edit data"
      );
      setIsUpdating(false);
      return;
    } else {
      Alert.alert("server error");
    }

    setEdit(false);
  }

  return (
    <div className="bg-white border-1 border-gray-400 rounded-md p-3 flex flex-col gap-4">
      <div className=" duration-300 ease-in-out  flex justify-between items-center w-full">
        <div className="flex items-center justify-start gap-2 ">
          <h1 className="text-lg font-semibold  max-[400px]:max-w-15 break-all">{uppercase(props.name)}</h1>
        </div>
        <div className="flex gap-3">
          <div
            style={{ display: `${props.numeric ? "" : "none"}` }}
            className="flex items-center">
            <Numeric
              setValue={setData}
              value={data}
              color={props.color}
              unit={uppercase(props.unit != null ? props.unit : "")}
            />
          </div>
          <button
            className="rounded-md  p-2 font-semibold text-slate-600 text-xs hover:cursor-pointer hover:bg-gray-200 transition delay-50 duration-300 ease-in-out flex justify-center h-8 w-8 items-center outline-1 outline-slate-400"
            onClick={() => complete()}>
            <FaCheck style={{ display: loading ? "none" : "" }} />
            <AiOutlineLoading
              className="animate-spin"
              style={{ display: !loading ? "none" : "" }}
            />
          </button>
          <button
            className="bg-white rounded-md cursor-pointer outline-1 flex justify-center h-8 items-center hover:bg-gray-200 transition delay-50 duration-300 ease-in-out outline-slate-400"
            onClick={() => setEdit(!edit)}>
            <CiMenuKebab color="#314158" size={18} />
          </button>
        </div>
      </div>
      {editUI()}
    </div>
  );
  function editUI() {
    if (!edit) return;
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 justify-between flex-wrap [@media(max-width:400px)]:justify-strech ">
          <input
            className="border-1 rounded-sm p-1 border-slate-400 text-sm [@media(max-width:400px)]:w-full"
            type="habitName"
            name="habitName"
            id="habitName"
            placeholder={"Enter new habit name..."}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-1">
            <h1 className="text-sm text-slate-600">Numeric:</h1>
            <Switch ticked={numeric} setStatus={setNumeric}></Switch>
          </div>
          <button
            className="outline-1 p-1 rounded-md outline-slate-400 cursor-pointer hover:bg-gray-200 transition delay-50 duration-300 ease-in-out"
            onClick={() => deleteHabit()}>
            <MdDeleteOutline color="#45556c" />
          </button>
          
        </div>
        <div className=" flex justify-stretch">
          <button
            className="bg-green-700 rounded-md text-sm p-1 text-white hover:cursor-pointer hover:bg-green-800 transition delay-50 duration-300 ease-in-out w-full flex justify-center"
            onClick={() => updateHabit()}>
            {`${isUpdating ? " " : "Save"}`}
            <AiOutlineLoading
              className="animate-spin"
              style={{ display: !isUpdating ? "none" : "" }}
            />
          </button>
        </div>
      </div>
    );
  }
}
function uppercase(text: string) {
  return text.slice(0, 1).toUpperCase() + text.slice(1).toLocaleLowerCase();
}
