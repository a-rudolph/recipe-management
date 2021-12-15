import { useEffect, useRef } from 'react'
import { Card, Text } from '@components/atoms'
import { padNumber } from '@utils/formatTime'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  text-align: start;

  padding: 16px;
  width: 168px;

  .time-container {
    border-bottom: 1px dashed ${({ theme }) => theme.colors.wheaty_2};
  }
`

const getNow = () => {
  const now = new Date()

  const hh = padNumber(now.getHours())
  const mm = padNumber(now.getMinutes())
  const ss = padNumber(now.getSeconds())

  return { hh, mm, ss }
}

export default function TimerCard() {
  const hmRef = useRef<HTMLSpanElement>(null)
  const ssRef = useRef<HTMLSpanElement>(null)

  const now = getNow()

  const setTime = (hh: string, mm: string, ss: string) => {
    if (!hmRef.current || !ssRef.current) return

    hmRef.current.innerText = `${hh}:${mm}`
    ssRef.current.innerText = `:${ss}`
  }

  useEffect(() => {
    if (!IS_PRODUCTION) return

    const intervalId = setInterval(() => {
      const { hh, mm, ss } = getNow()

      setTime(hh, mm, ss)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <StyledCard>
      <div className='time-container'>
        <Text fs='48px' color='wheaty_1'>
          <span ref={hmRef}>
            {now.hh}:{now.mm}
          </span>
        </Text>
        <Text fs='32px' color='wheaty_1'>
          <span ref={ssRef}>:{now.ss}</span>
        </Text>
      </div>
    </StyledCard>
  )
}
