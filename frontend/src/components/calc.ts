import { HabitType } from "./UserProvider";
import { corr } from "mathjs";

type Completion = {
  data: number;
  date: number; 
};

type CompletionWithHabitName = Completion & { habitName: string };

function getLocalDate(timestamp: number): number {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0); 
  return date.getTime(); 
}

export function groupCompletionsByDay(habits: HabitType[]): { [key: number]: CompletionWithHabitName[] } {
  const completionsByDay: { [key: number]: CompletionWithHabitName[] } = {};
  const habitNames = habits.map(habit => habit.habitName);

  habits.forEach(habit => {
    habit.completions.forEach(completion => {
      const localDate = getLocalDate(Number(completion.date));
      if (!completionsByDay[localDate]) {
        completionsByDay[localDate] = habitNames.map(name => ({
          data: 0,
          date: localDate,
          habitName: name,
        }));
      }

      const habitCompletion = completionsByDay[localDate].find(item => item.habitName === habit.habitName);
      if (habitCompletion) {
        habitCompletion.data = completion.data;
      }
    });
  });

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