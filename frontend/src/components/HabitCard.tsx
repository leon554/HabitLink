import { motion, AnimatePresence} from "motion/react";

interface HabitCardProps {
  name: string;
  value: number;
  animate: boolean;
}
export default function HabitCard(props: HabitCardProps) {
  return (
    <div className="bg-white border-2 rounded-md shadow-[6px_6px_0px_#008236] p-3 max-w-md w-full hover:bg-green-100 duration-300 ease-in-out">
      <div className="flex gap-1 items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900 cursor-default">
          {props.name}
        </h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={props.value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{ color: `${props.value < 0 ? "#c10007" : "#008236"}` }}
            className="text-sm font-medium"
          >
            {props.value >= 0 ? "+" : ""}
            {props.value}%
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-3 ">
        <div className="w-[100%] h-3 bg-gray-200 rounded-xl flex justify-center items-center relative">
          <div
            className={`rounded-full duration-600 ease-in h-3 bg-green-700 absolute transform -translate-x-1/2 opacity-40`}
            style={{
              width: `${Math.abs(props.value) / 2}%`,
              left: `${50 + props.value / 4}%`,
              backgroundColor: `${props.value < 0 ? "#c10007" : "#008236"}`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
