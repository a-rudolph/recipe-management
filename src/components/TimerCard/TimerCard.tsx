import { Button, Card } from '@components/atoms'
import { normalizeTimeValue, timeToSeconds } from '@utils/formatTime'
import { useEffect, useRef, useState } from 'react'
import Play from '@components/icons/Play'
import Plus from '@components/icons/Plus'
import { Row } from 'antd'
import Stop from '@components/icons/Stop'
import styled from 'styled-components'
import TimeDisplay from '@components/TimeDisplay'
import TimeInput from '@components/TimeInput'
import TimeRing from '@components/TimeRing'
import { useTimer } from '@hooks/useTimer'

const StyledCard = styled(Card)`
  position: relative;
  height: 232px;
  width: 272px;

  display: flex;
  align-items: center;
  justify-content: center;

  .time-input-wrapper {
    .atom-text {
      display: flex;
      flex-flow: nowrap;

      font-size: 38px;

      input {
        width: 48px;
      }
    }
  }

  .action-row {
    position: absolute;
    bottom: 44px;
    width: 100%;
    z-index: 5;
  }

  .stop-button {
    right: calc(50% - 16px);
  }

  .timer-button {
    border-style: none;
    cursor: pointer;
    background-color: transparent;
    z-index: 5;

    -webkit-tap-highlight-color: transparent;
    transition: all 0.1s;
  }

  .number-input {
    z-index: 5;
  }
`

export default function TimerCard() {
  const hmRef = useRef<HTMLSpanElement>(null)
  const ssRef = useRef<HTMLSpanElement>(null)

  const [percent, setPercent] = useState(0)

  const setTimeDisplay = ({ hh, mm, ss }: TimeValue, remaining: number) => {
    if (!hmRef.current || !ssRef.current) return

    hmRef.current.innerText = `${hh}:${mm}`
    ssRef.current.innerText = `:${ss}`

    const percent = remaining / totalSeconds

    setPercent(percent)
  }

  const { startTimer, stopTimer, isTimerRunning, timer } =
    useTimer(setTimeDisplay)

  const totalSeconds = timer?.totalSeconds || 0

  const handleClick = () => {
    setEditing(true)
  }

  const [isEditing, setEditing] = useState(false)

  const onEnter = (time: TimeValue) => {
    setEditing(false)
    const seconds = timeToSeconds(time)

    if (!seconds) return

    startTimer(time)
  }

  const onClose = isEditing
    ? () => {
        setEditing(false)
      }
    : undefined

  const plussable = !isTimerRunning && !isEditing

  return (
    <StyledCard onClose={onClose}>
      {isEditing && <AugmentedTimeInput onEnter={onEnter} />}
      <TimeDisplay
        style={{ display: isEditing ? 'none' : '' }}
        hmRef={hmRef}
        ssRef={ssRef}
      />
      <Row className='action-row centered'>
        {isTimerRunning && <Button icon={<Stop />} onClick={stopTimer} />}
        {plussable && <Button icon={<Plus />} onClick={handleClick} />}
      </Row>
      <TimeRing percent={percent} />
    </StyledCard>
  )
}

const AugmentedTimeInput = ({ onEnter }: { onEnter: TimeChangeHandler }) => {
  const [value, setValue] = useState<TimeValue>({ hh: '', mm: '', ss: '' })

  const handleDone = () => {
    // add validation 🤢

    setValue((value) => {
      onEnter(normalizeTimeValue(value))

      return {}
    })
  }

  useEffect(() => {
    const enterHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleDone()
      }
    }

    window.addEventListener('keydown', enterHandler)

    return () => {
      window.removeEventListener('keydown', enterHandler)
    }
  }, [])

  return (
    <>
      <TimeInput value={value} onChange={setValue} />
      <Row className='action-row centered'>
        <Button icon={<Play />} onClick={handleDone} />
      </Row>
    </>
  )
}
