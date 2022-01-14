import { useState, useRef, useEffect, useMemo } from 'react'
import { useNotification } from '@hooks/useNotification'
import {
  getSecondsToEndTime,
  getTimeToEndTime,
  timeToSeconds,
  getEndTime,
  dateToTime,
} from '@utils/formatTime'

export const useTimer = (
  setTime: (time: TimeValue, secondsRemaining: number) => void
) => {
  const [endTimeNumber, setEndTime] = useState<number>()

  const { setNotification } = useNotification()

  const timeoutRef = useRef<NodeJS.Timeout>()

  const startInterval = (endTime?: number) => {
    const intervalId = setInterval(() => {
      const timeLeft = getTimeToEndTime(endTime || endTimeNumber)
      const secondsLeft = getSecondsToEndTime(endTime || endTimeNumber)

      if (secondsLeft < 1) {
        setTime({ hh: '00', mm: '00', ss: '00' }, 0)
        endInterval()
        setNotification('Timer finished!', {
          body: 'get ready for next step',
          requireInteraction: true,
          dir: 'rtl',
        })
        return
      }

      setTime(timeLeft, secondsLeft)
    }, 1000)

    timeoutRef.current = intervalId
  }

  const endInterval = () => {
    clearInterval(timeoutRef.current)
  }

  useEffect(() => {
    if (endTimeNumber) startInterval()

    return endInterval
  }, [])

  const startTimer = (timeToEnd: TimeValue) => {
    endInterval()
    const seconds = timeToSeconds(timeToEnd)

    setTime(timeToEnd, seconds)

    const endTime = getEndTime(seconds)

    setEndTime(endTime)
    startInterval(endTime)
  }

  const endTime = useMemo(() => {
    if (!endTimeNumber) return null

    const end = new Date(endTimeNumber)

    return dateToTime(end)
  }, [endTimeNumber])

  return {
    startTimer,
    endTime,
  }
}
