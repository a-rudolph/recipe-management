import {
  dateToTime,
  getEndTime,
  getSecondsToEndTime,
  getTimeToEndTime,
  timeToSeconds,
} from '@utils/formatTime'
import { useRef, useEffect, useMemo } from 'react'
import { Howl } from 'howler'
import { messageSW } from '@utils/serviceworker-helpers'
import { useNotification } from '@hooks/useNotification'
import { useSettingContext } from '@components/SoundToggle'
import { useTimerContext } from './useTimerContext'

export const useTimer = (
  setTime: (time: TimeValue, secondsRemaining: number) => void
) => {
  const { timer, setTimer } = useTimerContext()
  const { on: soundEnabled } = useSettingContext()

  const endTimeNumber = timer?.endTime

  useNotification()

  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (endTimeNumber) {
      startInterval(endTimeNumber)
    }

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

    messageSW({ type: 'TIMER_FINISH' })
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

    timeoutRef.current = intervalId
  }

  const stopTimer = () => {
    messageSW({ type: 'TIMER_STOP' })

    setTime({ hh: '00', mm: '00', ss: '00' }, 0)
    endInterval()
    setTimer(null)
  }

  const endInterval = () => {
    clearInterval(timeoutRef.current)
  }

  const createRunningNotice = async (endTimeNumber: number) => {
    messageSW({ type: 'TIMER_START', payload: { endTimeNumber } })
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
