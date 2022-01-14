import TimeDisplay from '@components/TimeDisplay'
import TimeRing from '@components/TimeRing'
import styled from 'styled-components'
import { Card } from '@components/atoms'
import { useTimer } from '@hooks/useTimer'
import { secondsToTime } from '@utils/formatTime'
import { useRef, useState } from 'react'

const StyledCard = styled(Card)`
  position: relative;
  height: 200px;
  width: 240px;

  display: flex;
  justify-content: center;
  align-items: center;

  .time-container {
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

  const { startTimer } = useTimer(setTimeDisplay)

  const handleClick = () => {
    const seconds = 10
    const time = secondsToTime(seconds)

    total.current = seconds
    startTimer(time)
  }

  return (
    <StyledCard>
      <TimeDisplay onClick={handleClick} hmRef={hmRef} ssRef={ssRef} />
      <TimeRing percent={percent} />
    </StyledCard>
  )
}
