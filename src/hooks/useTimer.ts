import { useRef, useEffect, useMemo } from 'react'
import { useNotification } from '@hooks/useNotification'
import { useTimerContext } from './useTimerContext'
import {
  getSecondsToEndTime,
  getTimeToEndTime,
  timeToSeconds,
  getEndTime,
  dateToTime,
} from '@utils/formatTime'
import dayjs from 'dayjs'
import { Howl } from 'howler'

const useNotificationAction = (onActions: {
  [key: string]: (not: Notification) => void
}) => {
  useEffect(() => {
    const listener = (event) => {
      const action = event.action
      const notification = event.notification

      alert(String(event.notification))
      notification.close()

      const handler = onActions[action]

      if (handler) handler(notification)
    }

    console.log(onActions)

    self.addEventListener('notificationclick', listener)

    return () => {
      self.removeEventListener('notificationclick', listener)
    }
  }, [])
}

export const useTimer = (
  setTime: (time: TimeValue, secondsRemaining: number) => void
) => {
  const { timer, setTimer } = useTimerContext()

  const endTimeNumber = timer?.endTime

  const { setNotification } = useNotification()

  const timeoutRef = useRef<NodeJS.Timeout>()
  const runningNoticeRef = useRef<Notification | null>()

  useNotificationAction({
    finishedOk: (notification) => {
      notification.close()
    },
  })

  useEffect(() => {
    if (endTimeNumber) startInterval()

    return endInterval
  }, [endTimeNumber])

  const handleTimerFinished = () => {
    stopTimer()
    const sound = new Howl({
      src: ['beep.mp3'],
    })
    sound.play()

    setNotification('Timer finished', {
      body: "Time's up",
      requireInteraction: true,
      dir: 'rtl',
      actions: [
        {
          title: 'ok',
          action: 'finishedOk',
        },
      ],
    })
  }

  const startInterval = (endTime?: number) => {
    const intervalId = setInterval(() => {
      const timeLeft = getTimeToEndTime(endTime || endTimeNumber)
      const secondsLeft = getSecondsToEndTime(endTime || endTimeNumber)

      if (secondsLeft < 1) {
        handleTimerFinished()
        return
      }

      setTime(timeLeft, secondsLeft)
    }, 1000)

    timeoutRef.current = intervalId
  }

  const stopTimer = () => {
    runningNoticeRef.current?.close()
    setTime({ hh: '00', mm: '00', ss: '00' }, 0)
    endInterval()
    setTimer(null)
  }

  const endInterval = () => {
    clearInterval(timeoutRef.current)
  }

  const createRunningNotice = async (endTime: number) => {
    const formatted = dayjs(endTime).format('h[:]mm a')

    runningNoticeRef.current = await setNotification('Timer Running', {
      body: `Ending at ${formatted}`,
      silent: true,
    })
  }

  const startTimer = (timeToEnd: TimeValue) => {
    endInterval()
    const seconds = timeToSeconds(timeToEnd)

    setTime(timeToEnd, seconds)

    const endTime = getEndTime(seconds)

    setTimer({ endTime, totalSeconds: seconds })
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
    timer,
    isTimerRunning: Boolean(endTimeNumber),
  }
}
