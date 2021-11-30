import { Card, Text } from '@components/atoms'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  text-align: start;

  padding: 12px;
  width: 168px;
`

export default function TimerCard() {
  return (
    <StyledCard>
      <Text fs='48px' color='wheaty_1'>
        0:00
      </Text>
      <Text fs='32px' color='wheaty_1'>
        :00
      </Text>
    </StyledCard>
  )
}
