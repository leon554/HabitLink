import { supabase } from "@/supabase-client"
import type { HabitCompletionType, HabitType, APIResult } from "@/utils/types"
import { Util } from "@/utils/util"
import { dateUtils } from "@/utils/dateUtils"

export namespace HabitServiceLayer{
    export async function getHabits(userId: string | null): Promise<APIResult<Map<number, HabitType>>>{
        if (!userId) return Util.failAPICall("Not signed in")
        
        let { data: habitsData, error } = await supabase
            .from('habits')
            .select('*')
            .eq("user_id", userId)

        if(error){
            return Util.failAPICall("Habit fetch error: " + error.message)
        }

        const habits = habitsData as HabitType[]
        const habitMap = new Map<number, HabitType>()

        habits.forEach(h => {
            if(habitMap.has(Number(h.id))) {
                return Util.failAPICall("Duplicate habits skipped")
            }
            habitMap.set(Number(h.id), h)
            
        })
        return Util.successAPICall(habitMap)
    }

    export async function getHabitsCompletions(userId: string | null): Promise<APIResult<Map<number, HabitCompletionType[]>>>{
        if (!userId) return Util.failAPICall("Not signed in")

        let { data: habitsCompletionsData, error } = await supabase
            .from('habitCompletions')
            .select('*')
            .eq("user_id", userId)

        if(error){
            return Util.failAPICall("Habit completion fetch error: " + error.message)
        }

        const habitCompletionsTemp = (habitsCompletionsData ?? []) as HabitCompletionType[]
        const habitCompletionsMap = new Map<number, HabitCompletionType[]>()
        habitCompletionsTemp.forEach(h => {
            if(!habitCompletionsMap.has(h.habitId)){
                habitCompletionsMap.set(h.habitId, [])
            }
            habitCompletionsMap.get(h.habitId)!.push(h)
        })
        return Util.successAPICall(habitCompletionsMap)
    }

    export async function createHabit(  userId: string | null,  name: string, description: string, completionDays: string, emoji: string,  type: string, target: number): Promise<APIResult<null>>{
        if (!userId) return Util.failAPICall("Not signed in")

        const { error } = await supabase
            .from('habits')
            .insert([
                { name, description, icon: emoji, type, completionDays, user_id: userId, target, creationDate: Date.now()},
            ])

        if(error){
            return Util.failAPICall("Habit creation error: " + error.message)
        }
        return Util.successAPICall(null)
    }

    export async function completeHabit(
        userId: string | null,
        habitId: number,
        value: number,
        skip: boolean = false,
        date?: Date,
        notes?: string
    ): Promise<APIResult<null>>{
        if (!userId) return Util.failAPICall("Not signed in")

        const { error } = await supabase
            .from('habitCompletions')
            .insert([
                { habitId, data: value, date: date ? date.getTime() : Date.now(), user_id: userId, skip, notes},
            ])

        if(error){
            return Util.failAPICall("Habit Completion Error: " + error.message)
        }
        return Util.successAPICall(null)
    }

    export async function removeTodaysHabitCompletion(completions: HabitCompletionType[] | undefined): Promise<APIResult<boolean>>{
        if(!completions || completions.length === 0) return Util.successAPICall(false)

        const completionsToBeDeleted = completions.filter(c => dateUtils.isDatesSameDay(new Date(Number(c.date)), new Date()))
        const idsToBeDeleted = completionsToBeDeleted.map(c => Number(c.id))

        if(idsToBeDeleted.length === 0) return Util.successAPICall(false)

        const { error } = await supabase
            .from('habitCompletions')
            .delete()
            .in('id', idsToBeDeleted)

        if(error){
            return Util.failAPICall("Deletion Error: " + error.message)
        }
        return Util.successAPICall(true)
    }

    export async function updateHabitName(habitId: number, newName: string): Promise<APIResult<null>>{
        const { error } = await supabase
            .from('habits')
            .update({ name: newName })
            .eq('id', habitId)

        if(error){
            return Util.failAPICall("Habit name update erorr: " + error.message)
        }
        return Util.successAPICall(null)
    }

    export async function deleteHabit(habitId: number): Promise<APIResult<null>>{
        const { error: err1 } = await supabase
            .from('habitCompletions')
            .delete()
            .eq('habitId', habitId)
        const { error: err2 } = await supabase
            .from("habits")
            .delete()
            .eq("id", habitId)

        if(err1 || err2){
            return Util.failAPICall("Habit deletion error: " + err1?.message + err2?.message)
        }
        return Util.successAPICall(null)
    }

    export async function deleteHabitCompletion(completionId: number): Promise<APIResult<null>>{
        const { error } = await supabase
            .from('habitCompletions')
            .delete()
            .eq('id', completionId)

        if(error){
            return Util.failAPICall("Habit completion deletion error: " + error.message)
        }
        return Util.successAPICall(null)
    }

    export async function addNote(note: string, habitId: number): Promise<APIResult<HabitCompletionType>>{
        const { data, error } = await supabase
            .from('habitCompletions')
            .update({ notes: note})
            .eq('habitId', habitId)
            .order('created_at', { ascending: false })
            .limit(1)
            .select();

        if(error || !data?.[0]){
            return Util.failAPICall("Adding note error please try again")
        }
        return Util.successAPICall(data[0] as HabitCompletionType)
    }
}
