import { createContext, useContext, createElement, useState } from 'react'

const initialContext: TimerContextType = {
  endTimeNumber: null,
  setEndTime: () => {},
}

type TimerContextType = {
  endTimeNumber: number | null
  setEndTime: (end: number | null) => void
}

const TimerContext = createContext<TimerContextType>(initialContext)

export const useTimerContext = () => {
  return useContext(TimerContext)
}

export const TimerProvider = ({ children }) => {
  const [endTimeNumber, setEndTime] = useState<number | null>(null)

  return createElement(TimerContext.Provider, {
    children,
    value: { endTimeNumber, setEndTime },
  })
}
