import { getNow } from '@utils/formatTime'
import React, {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from 'react'

type TimerContextType = {
  timer: Timer | null
  setTimer: React.Dispatch<React.SetStateAction<Timer | null>>
}

export const TimerProvider: React.FC = ({ children }) => {
  const [timer, setTimer] = useState<Timer | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('timer')

    const timer: Timer | null = stored ? JSON.parse(stored) : null

    if (!timer || timer?.endTime <= getNow()) {
      return setTimer(null)
    }

    setTimer(timer)
  }, [])

  useEffect(() => {
    if (timer) {
      window.localStorage.setItem('timer', JSON.stringify(timer))
    }

    if (!timer) {
      window.localStorage.removeItem('timer')
    }
  }, [timer])

  return createElement(TimerContext.Provider, {
    children,
    value: { timer, setTimer },
  })
}

const initialContext: TimerContextType = {
  timer: null,
  setTimer: () => {},
}

const TimerContext = createContext<TimerContextType>(initialContext)

export const useTimerContext = () => {
  return useContext(TimerContext)
}
