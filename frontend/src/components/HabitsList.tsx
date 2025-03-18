import { SlGraph } from "react-icons/sl";
import { IoStatsChart } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HabitType, UserType } from "./UserProvider";

interface HabitListProps{
    User: UserType
    selectedHabit: HabitType | null
    setSelectedHabit: (selectedHabit: HabitType) => void
}
export default function HabitsList(props: HabitListProps) {
  return (
    <div className="shadow-[6px_6px_0px_#008236] max-w-150 w-[90%] xl:w-70 xl:m-6 mt-8 p-5 outline-2 rounded-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-md">Your Habits</h1>
        <IoStatsChart color="#62748e" />
      </div>
      <div className="flex flex-col gap-4">
        {props.User.habits && props.User.habits.length > 0 ? (
          props.User.habits.map((h) => (
            <div
              key={h.habitName}
              className={`rounded-md flex outline-1 outline-gray-200 
              ${
                props.selectedHabit?.habitName === h.habitName
                  ? "bg-green-50"
                  : "bg-white hover:bg-gray-100"
              } 
              transition ease-in-out duration-300 hover:cursor-pointer`}
              onClick={() => props.setSelectedHabit(h)}>
              <div
                className={`w-1.5 mr-2 rounded-tl-md rounded-bl-md transition ease-in-out duration-200 ${
                  props.selectedHabit?.habitName === h.habitName
                    ? "bg-green-700"
                    : "hover:bg-gray-100"
                } `}></div>
              <div className="m-2">
                <h1 className="font-medium">{uppercase(h.habitName)}</h1>
                <h1 className="text-xs mt-0.5 text-gray-700">
                  {h.completions.length} Entries
                </h1>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <SlGraph size={40} color="#008236" />
            <p className="text-gray-500 text-center">
              No habits tracked yet. Start by adding one!
            </p>
            <Link to={"/newhabit"}>
              <button className="bg-green-700 mt-3 mb-6 text-white p-2 rounded-md hover:bg-green-800 hover:cursor-pointer transition ease-in-out duration-300 flex items-center gap-1.5">
                <IoAddCircleOutline size={20} /> Add your first habit
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function uppercase(text: string) {
    return text.slice(0, 1).toUpperCase() + text.slice(1).toLocaleLowerCase();
  }