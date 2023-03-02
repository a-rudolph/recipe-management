import { create } from 'zustand'

export const useCurrentRecipeStore = create<{
  step: number | null
  startRecipe: () => void
  stopRecipe: () => void
  setStep: (_step: number) => void
}>((set) => ({
  step: null,
  startRecipe: () => set({ step: 0 }),
  stopRecipe: () => set({ step: null }),
  setStep: (step: number) => set({ step }),
}))
