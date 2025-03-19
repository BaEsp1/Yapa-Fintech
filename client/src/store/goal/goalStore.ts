import { create } from 'zustand'
export interface Goal {
  idGoal: number; 
  description: string
  amountObjective: number
  amount: number
  frequency: string
  startDate: Date
  targetDate: Date
  objectiveType: string
  progress: number
  status: string
}

export interface GoalStore {
  goal: Goal[]; 
  createGoal: (goal: Goal) => void
  updateGoal: (goal: Partial<Goal>) => void
  deleteGoal: () => void
  setGoal: (goal: Goal[]) => void 
}

export const useGoalStore = create<GoalStore>((set) => ({
  goal: [], 

  createGoal: (goal) => set((state) => ({ goal: [...state.goal, goal] })), 

  updateGoal: (updatedFields) =>
    set((state) => ({
      goal: state.goal.map((g) =>
        g.idGoal === updatedFields.idGoal ? { ...g, ...updatedFields } : g
      ),
    })),

  deleteGoal: () => set({ goal: [] }),

  setGoal: (goal) => set({ goal }) 
}))
