
interface TextCardProps{
    text: string
}
export default function TextCard(props: TextCardProps) {
  return (
    <div className="bg-white border-2 rounded-md shadow-[6px_6px_0px_#008236] p-3 max-w-md w-full flex justify-center hover:bg-green-100 duration-300 ease-in-out">
      <h1 className="text-2xl font-medium cursor-default">{props.text}</h1>
    </div>
  )
}
