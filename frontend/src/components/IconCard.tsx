import { motion } from "motion/react";

interface IconCardProps {
  icon: React.ElementType;
  text: string;
  freeWidth: boolean;
}
export default function IconCard(props: IconCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.1 }}
      className="bg-white border-2 rounded-md shadow-[6px_6px_0px_#008236] w-full flex justify-center flex-col items-center p-5 hover:bg-green-100 duration-300 ease-in-out"
      style={{
        maxWidth: `${props.freeWidth ? "" : "450px"}`,
      }}
    >
      <props.icon size={40} color="#008236" />
      <h1 className="font-medium mt-3.5 text-center cursor-default">
        {props.text}
      </h1>
    </motion.div>
  );
}
