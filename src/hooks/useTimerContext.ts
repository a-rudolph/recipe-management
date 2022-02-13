import { getNow } from '@utils/formatTime'
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from 'react'

type TimerContextType = {
  timer: Timer | null
  setTimer: (timer: Timer) => void
}

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState<Timer | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('timer')
    const timer = JSON.parse(stored) as Timer | null

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
