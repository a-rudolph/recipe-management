import TimeDisplay from '@components/TimeDisplay'
import TimeInput from '@components/TimeInput'
import TimeRing from '@components/TimeRing'
import styled from 'styled-components'
import PlusButton from '@components/icons/Plus'
import StopButton from '@components/icons/Stop'
import Play from '@components/icons/Play'
import { Card, Row } from '@components/atoms'
import { useTimer } from '@hooks/useTimer'
import { useRef, useState, useEffect } from 'react'
import { timeToSeconds, normalizeTimeValue } from '@utils/formatTime'

const StyledCard = styled(Card)`
  position: relative;
  height: 200px;
  width: 240px;

  display: flex;
  justify-content: center;
  align-items: center;

  .time-input-wrapper {
    .atom-text {
      display: flex;
      flex-flow: nowrap;

      font-size: 40px;

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

  .stop-button,
  .plus-button,
  .play-button {
    background: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
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

  const total = useRef<number>(0)

  const [percent, setPercent] = useState(0)

  const setTimeDisplay = ({ hh, mm, ss }: TimeValue, remaining: number) => {
    if (!hmRef.current || !ssRef.current) return

    hmRef.current.innerText = `${hh}:${mm}`
    ssRef.current.innerText = `:${ss}`

    const percent = remaining / total.current

    setPercent(percent)
  }

  const { startTimer, stopTimer, isTimerRunning } = useTimer(setTimeDisplay)

  const handleClick = () => {
    setEditing(true)
  }

  const [isEditing, setEditing] = useState(false)

  const onEnter = (time: TimeValue) => {
    setEditing(false)
    const seconds = timeToSeconds(time)

    if (!seconds) return

    total.current = seconds
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
        {isTimerRunning && (
          <button className='stop-button' onClick={stopTimer}>
            <StopButton />
          </button>
        )}
        {plussable && (
          <button className='plus-button' onClick={handleClick}>
            <PlusButton />
          </button>
        )}
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
    const enterHandler = (e) => {
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
        <button onClick={handleDone} className='play-button'>
          <Play className='play-icon' />
        </button>
      </Row>
    </>
  )
}
