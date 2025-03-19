import { useContext, useEffect, useState } from "react";
import { HabitType, userContext } from "../components/UserProvider";
import { Link} from "react-router-dom";
import { getCorrels } from "../components/calc";
import { IoAddCircleOutline } from "react-icons/io5";


import { motion } from "motion/react";

import HabitGraph from "../components/HabitGraph";
import HabitsList from "../components/HabitsList";
import HabitCorrelations from "../components/HabitCorrelations";
import HabitCompletions from "../components/HabitCompletions";

export interface Corels {
  [key: string]: number;
}
export default function Home() {
  const [selectedHabit, setSelectedHabit] = useState<HabitType | null>(null);
  const [corels, setCorels] = useState<Corels>({});

  const User = useContext(userContext);

  useEffect(() => {
    if (selectedHabit == null) return;
    if (User.habits == null) return;
    setCorels(getCorrels(User.habits, selectedHabit));
  }, [selectedHabit]);
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center mb-20"
    >
      <div className="mt-25 flex justify-between max-w-150 w-[90%] items-center xl:max-w-235">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <Link to={"/newhabit"}>
          <button className="bg-green-700 text-white p-2 rounded-md hover:bg-green-800 hover:cursor-pointer transition ease-in-out duration-300 flex items-center gap-1.5">
            <IoAddCircleOutline size={20} /> Add Habit
          </button>
        </Link>
      </div>

      <div className=" w-full flex max-xl:flex-col items-center xl:columns-2 xl:justify-center xl:items-start xl:gap-10 xl:mr-6">
        <HabitsList User={User} selectedHabit={selectedHabit} setSelectedHabit={setSelectedHabit}/>

        {User.habits && User.habits.length > 0 ? (
          <div className=" max-w-150 w-[90%] flex flex-col items-center ">
            <HabitCorrelations User={User} selectedHabit={selectedHabit} setSelectedHabit={setSelectedHabit} corels={corels}/>
            <HabitGraph habit={selectedHabit}></HabitGraph>
            <HabitCompletions selectedHabit={selectedHabit}/>
          </div>
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
}

