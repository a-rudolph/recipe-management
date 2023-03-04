import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCurrentRecipeStore = create(
  persist<{
    startTime: number | null
    step: number | null
    startRecipe: () => void
    stopRecipe: () => void
    setStep: (_step: number) => void
  }>(
    (set) => ({
      startTime: null,
      step: null,
      startRecipe: () => set({ step: 0, startTime: getStartHours() }),
      stopRecipe: () => set({ step: null, startTime: null }),
      setStep: (step: number) => set({ step }),
    }),
    {
      name: 'current-recipe',
    }
  )
)

const getStartHours = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // round minutes to the next 15
  const roundedMinutes = Math.ceil(minutes / 15) * 15

  return hours + roundedMinutes / 60 + 0.5
}
