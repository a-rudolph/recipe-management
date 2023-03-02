import { create } from 'zustand'

export const useCurrentRecipeStore = create<{
  step: number | null
  startTime: number | null
  startRecipe: () => void
  stopRecipe: () => void
  setStep: (_step: number) => void
}>((set) => ({
  startTime: null,
  step: null,
  startRecipe: () => set({ step: 0, startTime: getStartHours() }),
  stopRecipe: () => set({ step: null, startTime: null }),
  setStep: (step: number) => set({ step }),
}))

const getStartHours = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // round minutes to the next 15
  const roundedMinutes = Math.ceil(minutes / 15) * 15

  return hours + roundedMinutes / 60 + 0.5
}
