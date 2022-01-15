import { useState, useRef, useEffect, useMemo } from 'react'
import {
  requestNotificationPermission,
  useNotification,
} from '@hooks/useNotification'
import {
  getSecondsToEndTime,
  getTimeToEndTime,
  timeToSeconds,
  getEndTime,
  dateToTime,
} from '@utils/formatTime'
import dayjs from 'dayjs'

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
        stopTimer()
        setNotification('Timer finished!', {
          body: 'Time to move',
          requireInteraction: true,
          dir: 'rtl',
        })
        return
      }

      setTime(timeLeft, secondsLeft)
    }, 1000)

    timeoutRef.current = intervalId
  }

  const stopTimer = () => {
    setTime({ hh: '00', mm: '00', ss: '00' }, 0)
    endInterval()
    setEndTime(null)
  }

  const endInterval = () => {
    clearInterval(timeoutRef.current)
  }

  useEffect(() => {
    requestNotificationPermission()

    if (endTimeNumber) startInterval()

    return endInterval
  }, [])

  const createRunningNotice = (endTime: number) => {
    const formatted = dayjs(endTime).format('h[:]mm a')

    setNotification('Timer Running', {
      body: `Ending at ${formatted}`,
      silent: true,
    })
  }

  const startTimer = (timeToEnd: TimeValue) => {
    endInterval()
    const seconds = timeToSeconds(timeToEnd)

    setTime(timeToEnd, seconds)

    const endTime = getEndTime(seconds)

    setEndTime(endTime)
    startInterval(endTime)
    createRunningNotice(endTime)
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
    isTimerRunning: Boolean(endTimeNumber),
  }
}
