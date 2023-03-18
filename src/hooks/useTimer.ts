import {
  dateToTime,
  getEndTime,
  getSecondsToEndTime,
  getTimeToEndTime,
  timeToSeconds,
} from '@/utils/formatTime'
import { useEffect, useMemo, useRef } from 'react'
import { messageSW } from '@/utils/serviceworker-helpers'
import { useNotification } from '@/hooks/useNotification'
import { useTimerContext } from './useTimerContext'

export const useTimer = (
  setTime: (_time: TimeValue, _secondsRemaining: number) => void
) => {
  const { timer, setTimer } = useTimerContext()

  const endTimeNumber = timer?.endTime || null

  const { requestPermission } = useNotification()

  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (endTimeNumber) {
      startInterval(endTimeNumber)
    }

    return endInterval
  }, [endTimeNumber])

  const handleTimerFinished = () => {
    stopTimer()
  }

  const startInterval = (endTime: number) => {
    const intervalId = setInterval(() => {
      const timeLeft = getTimeToEndTime(endTime || endTimeNumber)
      const secondsLeft = getSecondsToEndTime(endTime || endTimeNumber)

      if (secondsLeft < 1) {
        handleTimerFinished()
        return
      }

      setTime(timeLeft, secondsLeft)
    }, 1_000)

    intervalRef.current = intervalId
  }

  const stopTimer = () => {
    messageSW({ type: 'TIMER_STOP' })

    setTime({ hh: '00', mm: '00', ss: '00' }, 0)
    endInterval()
    setTimer(null)
  }

  const endInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const createRunningNotice = async (endTimeNumber: number) => {
    messageSW({ type: 'TIMER_START', payload: { endTimeNumber } })
  }

  const startTimer = (timeToEnd: TimeValue) => {
    requestPermission(() => {
      endInterval()
      const seconds = timeToSeconds(timeToEnd)

      setTime(timeToEnd, seconds)

      const endTime = getEndTime(seconds)

      setTimer({ endTime, totalSeconds: seconds })
      startInterval(endTime)
      createRunningNotice(endTime)
    })
  }

  const endTime = useMemo(() => {
    if (!endTimeNumber) return null

    const end = new Date(endTimeNumber)

    return dateToTime(end)
  }, [endTimeNumber])

  return {
    startTimer,
    stopTimer,
    endTime,
    timer,
    isTimerRunning: Boolean(endTimeNumber),
  }
}
