import { HabitType } from "./UserProvider";
import { corr } from "mathjs";

type Completion = {
  data: number;
  date: number; // Unix millisecond timestamp
};

type CompletionWithHabitName = Completion & { habitName: string };

function getLocalDate(timestamp: number): number {
  const date = new Date(timestamp);
  // Adjust for local timezone (JavaScript automatically does this)
  date.setHours(0, 0, 0, 0); // Normalize to the start of the day (midnight)
  return date.getTime(); // Return as Unix millisecond timestamp
}

export function groupCompletionsByDay(habits: HabitType[]): { [key: number]: CompletionWithHabitName[] } {
  const completionsByDay: { [key: number]: CompletionWithHabitName[] } = {};
  const habitNames = habits.map(habit => habit.habitName);

  // Iterate through each habit
  habits.forEach(habit => {
    habit.completions.forEach(completion => {
      const localDate = getLocalDate(Number(completion.date));
      // If the day doesn't exist yet, create it
      if (!completionsByDay[localDate]) {
        completionsByDay[localDate] = habitNames.map(name => ({
          data: 0,
          date: localDate,
          habitName: name,
        }));
      }

      // Update the completion for the specific habit
      const habitCompletion = completionsByDay[localDate].find(item => item.habitName === habit.habitName);
      if (habitCompletion) {
        habitCompletion.data = completion.data;
      }
    });
  });

  // Sort the completionsByDay object by keys (dates) in ascending order
  const sortedCompletionsByDay: { [key: number]: CompletionWithHabitName[] } = {};
  Object.keys(completionsByDay)
    .sort((a, b) => Number(a) - Number(b))
    .forEach((key) => {
      sortedCompletionsByDay[Number(key)] = completionsByDay[Number(key)];
    });

  return sortedCompletionsByDay;
}


export function getCorrels(habits: HabitType[], selectedHabit: HabitType){
  const data = groupCompletionsByDay(habits)
  const formatedData : { [key: string]: number[] }= {}
  Object.entries(data).forEach(([_, value]) => {
    value.forEach(d => {
      if(!formatedData[d.habitName]){
        formatedData[d.habitName] = []
      }
      formatedData[d.habitName].push(d.data)
    })
  });
  const corels : { [key: string]: number } = {}
  Object.entries(formatedData).forEach(([key, value]) => {
    if(key != selectedHabit.habitName){
      corels[key] = Number(corr(value, formatedData[selectedHabit.habitName]))
    }
  })
  return corels
}