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
import { useSettingContext } from '@components/SoundToggle'

const TIMER_RUNNING = 'TIMER_RUNNING_TAG'
const TIMER_FINISHED = 'TIMER_FINISHED_TAG'

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
  const { on: soundEnabled } = useSettingContext()

  const endTimeNumber = timer?.endTime

  const { setNotification, getNotifications } = useNotification()

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

    if (soundEnabled) {
      const sound = new Howl({
        src: ['beep.mp3'],
      })
      sound.play()
    }

    setNotification('Timer finished', {
      body: "Time's up",
      tag: TIMER_FINISHED,
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

  const updateNotification = async () => {
    createRunningNotice(endTimeNumber)
  }

  const startInterval = (endTime?: number) => {
    const intervalId = setInterval(() => {
      const timeLeft = getTimeToEndTime(endTime || endTimeNumber)
      const secondsLeft = getSecondsToEndTime(endTime || endTimeNumber)

      if (secondsLeft < 1) {
        handleTimerFinished()
        return
      }

      updateNotification()

      setTime(timeLeft, secondsLeft)
    }, 1000)

    timeoutRef.current = intervalId
  }

  const stopTimer = async () => {
    const notifications = await getNotifications({ tag: TIMER_RUNNING })

    const notification = notifications[0] as Notification | undefined

    notification?.close()
    setTime({ hh: '00', mm: '00', ss: '00' }, 0)
    endInterval()
    setTimer(null)
  }

  const endInterval = () => {
    clearInterval(timeoutRef.current)
  }

  const createRunningNotice = async (endTime: number) => {
    const endMoment = dayjs(endTime)

    const formatted = endMoment.format('h[:]mm a')

    const timeLeft = getTimeToEndTime(endTime || endTimeNumber)

    const hmsString = `${timeLeft.hh}:${timeLeft.mm}:${timeLeft.ss}`

    await setNotification(
      'Timer Running',
      {
        body: `Time left: ${hmsString}, Ending at ${formatted}`,
        tag: TIMER_RUNNING,
        silent: true,
      },
      (...args) => {
        console.log('onClick!', args)
      }
    )
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
