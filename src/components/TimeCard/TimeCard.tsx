import { useState, useEffect } from 'react'
import { Card, Text } from '@components/atoms'
import { padNumber } from '@utils/formatTime'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  text-align: start;

  padding: 12px;
  width: 168px;
`

const useTime = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (!IS_PRODUCTION) return

    const intervalId = setInterval(() => {
      setNow(() => new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const hours = padNumber(now.getHours())
  const minutes = padNumber(now.getMinutes())
  const seconds = padNumber(now.getSeconds())

  return { hours, minutes, seconds }
}

export default function TimerCard() {
  const { hours, minutes, seconds } = useTime()

  return (
    <StyledCard>
      <Text fs='48px' color='wheaty_1'>
        {hours}:{minutes}
      </Text>
      <Text fs='32px' color='wheaty_1'>
        :{seconds}
      </Text>
    </StyledCard>
  )
}
