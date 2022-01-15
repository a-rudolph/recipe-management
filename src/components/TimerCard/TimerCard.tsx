import TimeDisplay from '@components/TimeDisplay'
import TimeInput from '@components/TimeInput'
import TimeRing from '@components/TimeRing'
import styled from 'styled-components'
import { Card } from '@components/atoms'
import { useTimer } from '@hooks/useTimer'
import { useRef, useState, useEffect } from 'react'
import { timeToSeconds, normalizeTimeValue } from '@utils/formatTime'
import Play from '@components/icons/Play'
import PlusButton from '@components/icons/Plus'

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

  .plus-button,
  .play-button {
    position: absolute;
    bottom: 44px;
    right: calc(50% - 24px);
    background: transparent;
    border: none;
    z-index: 5;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .timer-button {
    border-style: none;
    cursor: pointer;
    background-color: transparent;
    z-index: 5;

    -webkit-tap-highlight-color: transparent;
    transition: all 0.1s;
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

  const { startTimer } = useTimer(setTimeDisplay)

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

  return (
    <StyledCard onClose={onClose}>
      <button className='timer-button' onClick={handleClick}>
        {isEditing && <AugmentedTimeInput onEnter={onEnter} />}
        <TimeDisplay
          style={{ display: isEditing ? 'none' : '' }}
          hmRef={hmRef}
          ssRef={ssRef}
        />
      </button>
      {isEditing || (
        <button className='plus-button' onClick={handleClick}>
          <PlusButton />
        </button>
      )}
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
      <button onClick={handleDone} className='play-button'>
        <Play className='play-icon' />
      </button>
    </>
  )
}
