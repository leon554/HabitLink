import { supabase } from "@/supabase-client"
import type { HabitType } from "@/utils/types"
import type { APIResult } from "@/utils/types"
import { Util } from "@/utils/util"

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
}