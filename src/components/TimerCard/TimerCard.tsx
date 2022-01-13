import TimeDisplay from '@components/TimeDisplay'
import { useRef } from 'react'
import { Card } from '@components/atoms'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  position: relative;
  height: 200px;
  width: 240px;

  display: flex;
  justify-content: center;
  align-items: center;

  .ring {
    position: absolute;
    top: 16px;
    right: 36px;
    border: 1px solid ${({ theme }) => theme.colors.wheaty_1};
    border-radius: 50%;
    height: 200px;
    width: 200px;
  }
`

export default function TimerCard() {
  const hmRef = useRef<HTMLSpanElement>(null)
  const ssRef = useRef<HTMLSpanElement>(null)

  return (
    <StyledCard>
      <div className='ring' />
      <TimeDisplay hmRef={hmRef} ssRef={ssRef} />
    </StyledCard>
  )
}
