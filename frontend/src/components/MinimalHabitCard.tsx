import { useEffect, useState } from "react";

interface HabitCardProps{
    name: string
    value: number
    animate: boolean

}
export default function MinimalHabitCard(props: HabitCardProps) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if(isNaN(props.value)){
      setValue(0)
    }else{
      setValue(props.value)
    }
  }, [props.value])
  return (
    <div className="bg-white border-1 rounded-md p-3 w-full hover:bg-gray-100 duration-300 ease-in-out border-gray-400">
      <div className="flex gap-1 items-center justify-between">
        <h1 className="text-md font-medium text-gray-900 cursor-default">{props.name}</h1>
        <h2 className="text-xs font-medium mt-0.5 cursor-default mr-2" style={{
            color: `${(value < 0) ? "#c10007" : "#008236"}`
        }}>{value}%</h2>
      </div>
      <div className="flex justify-center mt-3 ">
        <div className="w-[100%] h-3 bg-gray-200 rounded-xl flex justify-center items-center relative">
          <div className={`duration-600 ease-in h-3 bg-green-700 absolute transform -translate-x-1/2 opacity-40 rounded-full`} style={{
            width: `${Math.abs(value)/2}%`,
            left: `${(50 + value/4)}%`,
            backgroundColor: `${(value < 0) ? "#c10007" : "#008236"}`
          }}></div>
        </div>
      </div>
    </div>
  );
}