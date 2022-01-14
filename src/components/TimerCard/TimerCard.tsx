import TimeDisplay from '@components/TimeDisplay'
import responsive from '@constants/responsive'
import TimeRing from '@components/TimeRing'
import styled from 'styled-components'
import { useTimer } from '@hooks/useTimer'
import { Card } from '@components/atoms'
import { secondsToTime } from '@utils/formatTime'
import { useRef, useState } from 'react'

const StyledCard = styled(Card)`
  position: relative;
  height: 200px;
  width: 240px;

  display: flex;
  justify-content: center;
  align-items: center;

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
    const seconds = 30
    const time = secondsToTime(seconds)

    total.current = seconds
    startTimer(time)
  }

  return (
    <StyledCard>
      <button onClick={handleClick}>
        <TimeDisplay hmRef={hmRef} ssRef={ssRef} />
      </button>
      <TimeRing percent={percent} />
    </StyledCard>
  )
}
