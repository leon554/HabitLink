import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import HabitCard from "../components/HabitCard";
import TextCard from "../components/TextCard";
import IconCard from "../components/IconCard";
import { LuLightbulb } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { LuMousePointer2 } from "react-icons/lu";
import { PiChartScatterBold } from "react-icons/pi";
import { motion } from "motion/react";

export default function Landing() {
  const [count, setCount] = useState([81, 34, -45, -77]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [];
      for (let i = 0; i < 4; i++) {
        const rng = Math.random();
        if (rng <= 0.5) {
          newData.push(Math.round(Math.random() * 100));
        } else {
          newData.push(Math.round(Math.random() * 100) * -1);
        }
      }
      setCount([...newData]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="  flex max-lg:flex-col items-center justify-center  lg:h-[100vh] max-lg:mt-36 gap-10">
        <div className=" flex-4  flex items-center justify-center  ml-10 mr-15 max-lg:ml-0  max-lg:mr-0 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-7  max-lg:flex flex-col max-lg:items-center w-full"
          >
            <h1 className="text-5xl font-bold  max-lg:text-center 2xl:text-6xl cursor-default w-full leading-tight">
              Unlock the hidden <p className="text-green-700">connections</p>{" "}
              between your daily habits
            </h1>
            <h1 className="text-center mt-7 text-lg text-gray-700 max-w-150 lg:text-left">
              Discover how your habits influence each other and optimize your
              daily routine with data-driven insights.
            </h1>
            <Link to={"/signin"}>
              <motion.button
                className="p-2 bg-green-700 mt-7 rounded-md pr-4 pl-4 hover:bg-green-800 font-medium text-zinc-200 hover:cursor-pointer  hover:text-zinc-100 duration-300 ease-in-out "
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.01 }}
              >
                Try Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className=" flex-3 mr-10 w-[80%] flex flex-col items-center max-lg:mt-15 max-lg:mr-0 gap-6 lg:gap-15 lg:mt-0 justify-center"
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.1 }}
            className="w-full flex justify-center"
          >
            <TextCard text="What habits are affecting my sleep?" />
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.1 }}
            className="w-full flex justify-center lg:mr-30"
          >
            <HabitCard animate={true} name="Gym" value={count[0]} />
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.1 }}
            className="w-full flex justify-center"
          >
            <HabitCard animate={true} name="Running" value={count[1]} />
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.1 }}
            className="w-full flex justify-center lg:mr-30"
          >
            <HabitCard animate={true} name="Meditation" value={count[2]} />
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.1 }}
            className="w-full lg:hidden flex justify-center"
          >
            <HabitCard animate={true} name="Eating Out" value={count[3]} />
          </motion.div>
        </motion.div>
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex justify-center flex-col items-center"
      >
        <div className="w-[80%] flex justify-center">
          <h1 className="text-4xl font-bold  max-lg:text-center cursor-default">
            See exactly how your habits are correlated
          </h1>
        </div>
        <br />
        <br />
        <motion.div className="flex flex-col gap-6 xl:flex-row  w-[80%] justify-center items-center xl:items-stretch xl:mt-25 xl:mb-30 xl:gap-15 mt-6">
          <IconCard
            icon={LuLightbulb}
            text="Identify which habits contribute to productivity, health, or happiness."
            freeWidth={false}
          />

          <IconCard
            icon={BsLightningCharge}
            text="Detect negative habits that correlate with low energy or stress."
            freeWidth={false}
          />

          <IconCard
            icon={GoGoal}
            text="Improve goal tracking with data-driven insights."
            freeWidth={false}
          />
        </motion.div>
      </motion.div>
      <br />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex justify-center flex-col items-center"
      >
        <div className="w-[80%] flex justify-center">
          <h1 className="text-4xl font-bold  max-lg:text-center cursor-default max-xl:mt-20">
            How it works
          </h1>
        </div>
        <br />
        <div className=" flex flex-col gap-6  w-[80%] justify-center items-center  xl:mt-25 xl:mb-30 xl:gap-15 mt-6 max-w-xlg max-xl:mt-10">
          <IconCard
            icon={MdOutlineStickyNote2}
            text="Start by logging your daily habits or stats, like hours slept."
            freeWidth={false}
          />
          <FaChevronDown />
          <IconCard
            icon={LuMousePointer2}
            text="Next, select a habit to analyze."
            freeWidth={false}
          />
          <FaChevronDown />
          <IconCard
            icon={PiChartScatterBold}
            text="Correlink then analyzes the connection between your chosen habit and the rest, giving you valuable insights into how they influence each other."
            freeWidth={false}
          />
          <FaChevronDown />
          <Link to={"/signin"}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{duration: 0.01}}
              className="p-2 bg-green-700 rounded-md pr-4 pl-4 font-medium text-zinc-200 hover:cursor-pointer hover:bg-green-800 hover:text-zinc-100 duration-300 ease-in-out"
            >
              Start Tracking Now
            </motion.button>
          </Link>
        </div>
      </motion.div>
      <br />
      <br />
      <br />
      <br />
      <footer className=" flex justify-center">
        <p className="font-light text-xs">Created by leon smit 2025</p>
        <br />
      </footer>
    </>
  );
}
