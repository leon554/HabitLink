import { useRef, useState } from "react";
import { HabitType } from "./UserProvider";

interface SelectProps {
  habits: HabitType[];
  selectedHabit: HabitType | null;
  setSelectedHabit: (habit: HabitType) => void;
}
export default function Select(props: SelectProps) {
  const focusElement = useRef<null|HTMLButtonElement>(null)
  const [clicked, setClicked] = useState(false)
  function setHabit(h: HabitType) {
    props.setSelectedHabit(h);
    if(focusElement.current != null){
      focusElement.current.blur()
    }
  }
  return (
    <div>
      <button className="group relative border border-gray-300 bg-white text-sm text-gray-700 font-semibold px-3 py-1 rounded-md flex justify-center  transition delay-50 duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-100" 
        ref={focusElement} onClick={() => setClicked(!clicked)}
      >
        {props.selectedHabit == null
          ? "Select Habit"
          : uppercase(props.selectedHabit.habitName)}
        <div className="absolute top-full rounded-md p-3 mt-3  flex flex-col justify-start items-start scale-0 origin-top duration-200 bg-white outline-1 outline-gray-300 z-20 w-40" style={{
          scale: clicked ? 1 : 0
        }}>
          {props.habits && props.habits.map((h) => {
            return (
              <p
                className="hover:bg-gray-200 w-full flex justify-start p-1 rounded-md transition duration-100 ease-in-out hover:cursor-pointer"
                onClick={() => setHabit(h)}
              >
                {uppercase(h.habitName)}
              </p>
            );
          })}
        </div>
      </button>
    </div>
  );
}
function uppercase(text: string) {
  return text.slice(0, 1).toUpperCase() + text.slice(1).toLocaleLowerCase();
}