import { useRef, useState } from 'react'
import { Card, Row, Text } from '@components/atoms'
import { useTimer } from '@hooks/useTimer'
import TimeInput from '@components/TimeInput'
import styled from 'styled-components'
import Modal from '@components/Modal'

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

  .atom-modal-card.atom-card {
    width: max-content;
    height: max-content;
    padding: 24px;

    .footer {
      justify-content: end;

      button {
        margin: 16px 0 0 16px;
        padding: 4px 16px;
        line-height: 1.5;
        background: transparent;
        color: ${({ theme }) => theme.colors.wheaty_1};
        border-color: ${({ theme }) => theme.colors.wheaty_1};
        border-style: solid;
        border-radius: 4px;
      }
    }
  }
`

const normalizeTimeValue = (value: TimeValue): Required<TimeValue> => {
  return {
    hh: value.hh || '00',
    mm: value.mm || '00',
    ss: value.ss || '00',
  }
}

export default function TimerCard() {
  const hmRef = useRef<HTMLSpanElement>(null)
  const ssRef = useRef<HTMLSpanElement>(null)

  const setTimeDisplay = ({ hh, mm, ss }: TimeValue) => {
    if (!hmRef.current || !ssRef.current) return

    hmRef.current.innerText = `${hh}:${mm}`
    ssRef.current.innerText = `:${ss}`
  }

  const { startTimer } = useTimer(setTimeDisplay)

  const [visible, setVisible] = useState(false)

  const setTime = (timeToEnd: TimeValue) => {
    startTimer(timeToEnd)
  }

  const [value, setValue] = useState<TimeValue>({})

  const onDone = () => {
    // validate 🤢

    setTime(normalizeTimeValue(value))
    onCancel()
  }

  const onCancel = () => {
    setVisible(false)
    setValue({})
  }

  return (
    <StyledCard>
      <Modal closeable={false} visible={visible}>
        <Row>
          <Text weight={500} fs='32px'>
            Timer
          </Text>
        </Row>
        <TimeInput value={value} onChange={setValue} />
        <Row className='footer'>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onDone}>Done</button>
        </Row>
      </Modal>
      <div onClick={() => setVisible(true)} className='time-container'>
        <Text fs='48px' color='wheaty_1'>
          <span ref={hmRef}>00:00</span>
        </Text>
        <Text fs='32px' color='wheaty_1'>
          <span ref={ssRef}>:00</span>
        </Text>
      </div>
    </StyledCard>
  )
}
