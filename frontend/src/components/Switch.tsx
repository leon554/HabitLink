import { useState } from "react";

interface TickeProps{
    ticked: boolean
    setStatus: (ticked: boolean) => void
}
export default function Switch(props: TickeProps) {
  const [ticked, setTicked] = useState(props.ticked);

  function tick() {
    setTicked(!ticked);
    props.setStatus(!ticked)
  }

  return (
    <div
      className={` w-9.5  rounded-full  flex items-center p-0.5  cursor-pointer ${ticked ? "bg-green-700 outline-white outline-0" : "bg-white outline-slate-400 outline-1 h-5"} duration-200 ease-in-out`}
      onClick={tick}
    >
      <div
        className={`h-4 w-4 bg-slate-400 rounded-full duration-200 ease-in-out transform ${ticked ? "translate-x-4.5 bg-white" : "translate-x-0"}`}
      ></div>
    </div>
  );
}
