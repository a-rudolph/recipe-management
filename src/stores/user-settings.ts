import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const SEVEN_IN_MINUTES = 7 * 60
const TWENTY_TWO_IN_MINUTES = 22 * 60

const INITIAL_SETTINGS = {
  activeTimeStart: SEVEN_IN_MINUTES,
  activeTimeEnd: TWENTY_TWO_IN_MINUTES,
  showTimer: false,
}

const tips_to_show = {
  inactiveTime: true,
}

type TipsToShow = typeof tips_to_show

type UserSettings = typeof INITIAL_SETTINGS

export const useUserSettingsStore = create(
  persist<{
    settings: UserSettings
    tooltips: TipsToShow
    updateSettings: (_settings: Partial<UserSettings>) => void
    updateTips: (_tips: Partial<TipsToShow>) => void
    resetTips: () => void
  }>(
    (set) => ({
      settings: INITIAL_SETTINGS,
      tooltips: tips_to_show,
      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),
      updateTips: (tips) =>
        set((state) => ({ tooltips: { ...state.tooltips, ...tips } })),
      resetTips: () => set({ tooltips: tips_to_show }),
    }),
    {
      // name of the localStorage key
      name: 'user-settings',
    }
  )
)
