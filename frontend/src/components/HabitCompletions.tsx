import { MdFileDownloadDone } from "react-icons/md";
import { HabitType } from "./UserProvider";

interface HabitCompletionProps{
    selectedHabit: HabitType | null
}
export default function HabitCompletions(props: HabitCompletionProps) {

  const days: { [key: string]: string } = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
  };
  return (
    <div className="shadow-[6px_6px_0px_#008236] max-w-150 w-[100%] mt-13 p-5 outline-2 rounded-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-medium flex items-center gap-2">
          Habit Completions
        </h1>
        <MdFileDownloadDone color="#62748e" size={20} />
      </div>

      <div className="flex flex-col gap-4 items-center w-full max-h-100 overflow-y-scroll p-[1px] no-scrollbar">
        {props.selectedHabit &&
          props.selectedHabit.completions!.map((h) => {
            const date = new Date();
            date.setTime(Number(h.date));
            return (
              <div className="w-full flex outline-1 p-1 rounded-md outline-gray-400 justify-between">
                <h1 className="text-sm text-gray-700 ml-1.5">
                  {days[`${date.getDay()}`]} - {date.getDate()}/
                  {date.getMonth() + 1}/{date.getFullYear()}
                </h1>
                <h1 className="text-sm text-gray-700 mr-1.5">{h.data}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}
