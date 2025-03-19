

interface NumericProps{
    value: string
    setValue: (value: string) => void
    color: string
    unit: string
}
export default function Numeric(props: NumericProps) {
  
  return (
    <div className=" rounded-md flex justify-center items-center h-6 p-0 outline-1 outline-slate-400" >
      <h1 className=" pl-2 pr-2 rounded-md w-7 text-center text-slate-600 hover:cursor-pointer hover:bg-gray-200 duration-300 ease-in-out select-none" onClick={() => props.setValue(`${Number(props.value) - 1}`)}>-</h1>
      <h1 className="text-slate-600 text-sm m-0 hover:cursor-default pl-2 pr-0.5" style={{display: (props.value == "" ? "none" : "")}}>{props.value}</h1>
      <h1 className="text-slate-600 text-sm m-0 hover:cursor-default pr-2">{props.unit}</h1>
      <h1 className=" pl-2 pr-2 rounded-md w-7 text-center text-slate-600 hover:cursor-pointer hover:bg-gray-200 duration-300 ease-in-out select-none" onClick={() => props.setValue(`${Number(props.value) + 1}`)}>+</h1>
    </div>
  )
}
