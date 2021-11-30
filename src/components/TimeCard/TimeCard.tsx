import { Text } from '@components/atoms'
import styled from 'styled-components'

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.mono_1};
  border-radius: 15px;

  padding: 16px;

  display: flex;
  align-items: baseline;
  justify-content: center;

  text-align: start;
  width: 168px;
`

export default function TimerCard() {
  return (
    <Card>
      <Text fs='48px' color='wheaty_1'>
        0:00
      </Text>
      <Text fs='32px' color='wheaty_1'>
        :00
      </Text>
    </Card>
  )
}
