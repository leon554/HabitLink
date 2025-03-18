import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaChartLine } from "react-icons/fa6";
import MinimalHabitCard from "../components/MinimalHabitCard";
import Select from "../components/Select";
import { useState } from "react";
import { UserType, HabitType } from "./UserProvider";
import { Corels } from "../pages/Home";

interface HabitCorrelationProps{
    User: UserType
    selectedHabit: HabitType | null
    setSelectedHabit: (selectedHabit: HabitType) => void
    corels: Corels
}
export default function HabitCorrelations(props: HabitCorrelationProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="shadow-[6px_6px_0px_#008236] max-w-150 w-[100%] mt-13 xl:mt-6 p-5 outline-2 rounded-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-medium flex items-center gap-2">
          <FaChartLine color="#008236" /> Habit Correlations
        </h1>
        <IoMdInformationCircleOutline
          color="#62748e"
          size={18}
          className="hover:cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        />
      </div>
      <div
        className="outline-1 p-2 rounded-md outline-gray-400 mb-4"
        style={{ display: showInfo ? "" : "none" }}>
        <h1 className="text-sm text-gray-700">
          Correlation values indicate how strongly habits are related. Positive
          values (green) mean habits tend to occur together, while negative
          values (red) indicate an inverse relationship. Higher percentage
          values represent stronger correlations. To get accurate correlation
          data, you need to track your habits consistently for at least a week.
          The more you track, the more precise the calculations will be.
        </h1>
      </div>
      {props.User.habits!.length > 1 ? (
        <>
          <div className="flex gap-2 items-center   mb-7">
            <h1 className="text-sm font-medium text-gray-700">
              How do my habits impact{" "}
            </h1>
            <Select
              habits={props.User.habits!}
              selectedHabit={props.selectedHabit}
              setSelectedHabit={props.setSelectedHabit}
            />
          </div>

          <div className="flex flex-col gap-4 items-center w-full">
            {props.User.habits &&
              props.User.habits!.map((h) => {
                if (h.habitName != props.selectedHabit?.habitName) {
                  return (
                    <div className="w-full flex justify-center">
                      <MinimalHabitCard
                        name={uppercase(h.habitName)}
                        value={
                          props.corels &&
                          Math.round(props.corels[h.habitName] * 100 * 100) / 100
                        }
                        animate={false}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-gray-500 text-center mt-7 mb-5">
            You need 2 or more habits to see correlation info
          </h1>
        </div>
      )}
    </div>
  );
}
function uppercase(text: string) {
    return text.slice(0, 1).toUpperCase() + text.slice(1).toLocaleLowerCase();
}