import TimeDisplay from '@components/TimeDisplay'
import responsive from '@constants/responsive'
import TimeInput from '@components/TimeInput'
import TimeRing from '@components/TimeRing'
import styled from 'styled-components'
import { Card } from '@components/atoms'
import { timeToSeconds, normalizeTimeValue } from '@utils/formatTime'
import { useTimer } from '@hooks/useTimer'
import { useRef, useState, useEffect } from 'react'

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

  button {
    z-index: 5;

    border-style: none;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-color: transparent;

    cursor: pointer;

    -webkit-tap-highlight-color: transparent;

    @media (hover: hover) and (min-width: ${responsive.md}px) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.wheaty_3}0a;
      }
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.wheaty_2}2a;
    }

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

  return (
    <StyledCard>
      <button onClick={handleClick}>
        {isEditing && <AugmentedTimeInput onEnter={onEnter} />}
        <TimeDisplay
          style={{ display: isEditing ? 'none' : '' }}
          hmRef={hmRef}
          ssRef={ssRef}
        />
      </button>
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

  return <TimeInput value={value} onChange={setValue} />
}
