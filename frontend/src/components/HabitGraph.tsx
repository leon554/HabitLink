import { LuCalendarDays } from "react-icons/lu";
import { HabitType } from "./UserProvider";
import { useEffect, useState } from "react";

interface HabitGraphProps {
    habit: HabitType | null;
}
export default function HabitGraph(props: HabitGraphProps) {
    const [dates, setdates] = useState<{ [key: number]: number } | null>({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0});
    const [totalComps, setTotalComps] = useState(0);

    useEffect(() => {
        if (props.habit == null) return;
        setdates(calcDays());
        setTotalComps(props.habit.completions.length);
        if (dates == null) return;
    }, [props.habit]);

    function calcDays() {
        const compDays: { [key: number]: number } = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0};
        if (props.habit == null) return null;
        props.habit.completions.forEach((h) => {
            const date = new Date();
            date.setTime(Number(h.date));
            if (!(date.getDay() in compDays)) {
                compDays[date.getDay()] = 0;
            }
            compDays[date.getDay()] += 1;
        });
        return compDays;
    }
    return (
        <div className="shadow-[6px_6px_0px_#008236] max-w-150 w-[100%] mt-13 p-5 outline-2 rounded-md bg-white">
            <div className="flex justify-between items-center">
                <h1 className="font-medium flex items-center gap-2">
                    Most Common Completion Days
                </h1>
                <LuCalendarDays color="#62748e" size={20} />
            </div>
            {props.habit != null && dates != null && props.habit.completions.length>0? (
                <div className=" h-60 mt-5 flex justify-around items-end">
                    <div
                        className="bg-green-700 w-[12.5%] flex justify-center items-end rounded-md pb-0.5 min-h-6 duration-500 ease-in-out"
                        style={{ height: `${(dates[1] / totalComps) * 100}%` }}
                    >
                        <p className="text-xs max-sm:text-[10px] mb-0.5 text-white ">{`${Math.round((dates[1] / totalComps) * 100)}%`} &nbsp; </p>
                        <p className="max-sm:text-[10px] text-xs mb-0.5 text-white ">M</p>
                    </div>
                    <div
                        className="bg-green-700 w-[12.5%] flex justify-center items-end rounded-md pb-0.5 min-h-6 duration-500 ease-in-out"
                        style={{ height: `${(dates[2] / totalComps) * 100}%` }}
                    >
                        <p className="text-xs max-sm:text-[10px] mb-0.5 text-white ">{`${Math.round((dates[2] / totalComps) * 100)}%`} &nbsp; </p>
                        <p className="max-sm:text-[10px] text-xs mb-0.5 text-white ">T</p>
                    </div>
                    <div
                        className="bg-green-700 w-[12.5%] flex justify-center items-end rounded-md pb-0.5 min-h-6 duration-500 ease-in-out"
                        style={{ height: `${(dates[3] / totalComps) * 100}%` }}
                    >
                        <p className="text-xs max-sm:text-[10px] mb-0.5 text-white ">{`${Math.round((dates[3] / totalComps) * 100)}%`} &nbsp; </p>
                        <p className="max-sm:text-[10px] text-xs mb-0.5 text-white ">W</p>
                    </div>
                    <div
                        className="bg-green-700 w-[12.5%] flex justify-center items-end rounded-md pb-0.5 min-h-6 duration-500 ease-in-out"
                        style={{ height: `${(dates[4] / totalComps) * 100}%` }}
                    >
                        <p className="text-xs max-sm:text-[10px] mb-0.5 text-white ">{`${Math.round((dates[4] / totalComps) * 100)}%`} &nbsp; </p>
                        <p className="max-sm:text-[10px] text-xs mb-0.5 text-white ">T</p>
                    </div>
                    <div
                        className="bg-green-700 w-[12.5%] flex justify-center items-end rounded-md pb-0.5 min-h-6 duration-500 ease-in-out"
                        style={{ height: `${(dates[5] / totalComps) * 100}%` }}
                    >
                        <p className="text-xs max-sm:text-[10px] mb-0.5 text-white ">{`${Math.round((dates[5] / totalComps) * 100)}%`} &nbsp; </p>
                        <p className="max-sm:text-[10px] text-xs mb-0.5 text-white ">F</p>
                    </div>
                    <div
                        className="bg-green-700 w-[12.5%] flex justify-center items-end rounded-md pb-0.5 min-h-6 duration-500 ease-in-out"
                        style={{ height: `${(dates[6] / totalComps) * 100}%` }}
                    >
                        <p className="text-xs max-sm:text-[10px] mb-0.5 text-white ">{`${Math.round((dates[6] / totalComps) * 100)}%`} &nbsp; </p>
                        <p className="max-sm:text-[10px] text-xs mb-0.5 text-white ">S</p>
                    </div>
                    <div
                        className="bg-green-700 w-[12.5%] flex justify-center items-end rounded-md pb-0.5 min-h-6 duration-500 ease-in-out"
                        style={{ height: `${(dates[0] / totalComps) * 100}%` }}
                    >
                        <p className="text-xs max-sm:text-[10px] mb-0.5 text-white ">{`${Math.round((dates[0] / totalComps) * 100)}%`} &nbsp; </p>
                        <p className="max-sm:text-[10px] text-xs mb-0.5 text-white ">S</p>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="text-center mt-10 mb-6 text-gray-600">
                        Please select a habit or log completions for the selected habit
                    </p>
                </div>
            )}
        </div>
    );
}
