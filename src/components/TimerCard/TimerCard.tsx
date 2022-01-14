import TimeDisplay from '@components/TimeDisplay'
import TimeRing from '@components/TimeRing'
import styled from 'styled-components'
import { Card } from '@components/atoms'
import { useRef } from 'react'

const StyledCard = styled(Card)`
  position: relative;
  height: 200px;
  width: 240px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default function TimerCard() {
  const hmRef = useRef<HTMLSpanElement>(null)
  const ssRef = useRef<HTMLSpanElement>(null)

  return (
    <StyledCard>
      <TimeRing percent={0.5} />
      <TimeDisplay hmRef={hmRef} ssRef={ssRef} />
    </StyledCard>
  )
}
