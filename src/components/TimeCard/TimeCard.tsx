import { requestNotificationPermission } from '@hooks/useNotification'
import { useRef, useState } from 'react'
import { useTimer } from '@hooks/useTimer'
import { Card } from '@components/atoms'
import styled from 'styled-components'
import TimeDisplay from '@components/TimeDisplay'
import SetTimeModal from '@components/SetTimeModal'

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

export default function TimeCard() {
  const hmRef = useRef<HTMLSpanElement>(null)
  const ssRef = useRef<HTMLSpanElement>(null)

  const setTimeDisplay = ({ hh, mm, ss }: TimeValue) => {
    if (!hmRef.current || !ssRef.current) return

    hmRef.current.innerText = `${hh}:${mm}`
    ssRef.current.innerText = `:${ss}`
  }

  const { startTimer } = useTimer(setTimeDisplay)

  const [visible, setVisible] = useState(false)

  const onDone = (value: Required<TimeValue>) => {
    requestNotificationPermission((permission) => {
      if (permission !== 'granted') {
        alert(
          'you must grant permission in order to be notified when a timer finishes'
        )
      }
      startTimer(value)
      setVisible(false)
    })
  }

  return (
    <StyledCard>
      <SetTimeModal
        visible={visible}
        onClose={() => setVisible(false)}
        onDone={onDone}
      />
      <TimeDisplay hmRef={hmRef} ssRef={ssRef} />
    </StyledCard>
  )
}
