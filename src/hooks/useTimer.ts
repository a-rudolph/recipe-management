import { useState, useRef, useEffect, useMemo } from 'react'
import {
  getTimeToEndTime,
  timeToSeconds,
  getEndTime,
  dateToTime,
} from '@utils/formatTime'

export const useTimer = (setTime: (time: TimeValue) => void) => {
  const [endTimeNumber, setEndTime] = useState<number>()

  const timeoutRef = useRef<NodeJS.Timeout>()

  const startInterval = (endTime?: number) => {
    const intervalId = setInterval(() => {
      const timeLeft = getTimeToEndTime(endTime || endTimeNumber)

      if (timeToSeconds(timeLeft) < 1) {
        setTime({ hh: '00', mm: '00', ss: '00' })
        endInterval()
        return
      }

      setTime(timeLeft)
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

    setTime(timeToEnd)

    const seconds = timeToSeconds(timeToEnd)
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
