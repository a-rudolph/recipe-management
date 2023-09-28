import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const SEVEN_IN_MINUTES = 7 * 60
const TWENTY_TWO_IN_MINUTES = 22 * 60

const INITIAL_SETTINGS = {
  activeTimeStart: SEVEN_IN_MINUTES,
  activeTimeEnd: TWENTY_TWO_IN_MINUTES,
}

type UserSettings = typeof INITIAL_SETTINGS

export const useUserSettingsStore = create(
  persist<{
    settings: UserSettings
    updateSettings: (_settings: Partial<UserSettings>) => void
  }>(
    (set) => ({
      settings: INITIAL_SETTINGS,
      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),
    }),
    {
      // name of the localStorage key
      name: 'user-settings',
    }
  )
)
