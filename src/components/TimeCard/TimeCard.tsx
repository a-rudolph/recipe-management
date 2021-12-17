import { secondsToTime, timeToSeconds } from '@utils/formatTime'
import { useEffect, useRef, useState } from 'react'
import { Card, Row, Text } from '@components/atoms'
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

const useTimer = () => {
  const [timer, setTimer] = useState<number>(0)
  const timeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  useEffect(() => {
    if (timer <= 0) {
      clearTimeout(timeout.current)
      return
    }
  }, [timer])

  const decrement = () => {
    setTimer((prev) => {
      if (!prev || prev < 0) return

      return prev - 1
    })
  }

  const startTimer = (time: TimeValue) => {
    setTimer(timeToSeconds(time))
    timeout.current = setInterval(decrement, 1000)
  }

  return { timer, startTimer }
}

export default function TimerCard() {
  const { startTimer, timer } = useTimer()

  const { hh, mm, ss } = secondsToTime(timer)

  const [visible, setVisible] = useState(false)

  const setTime = (time: TimeValue) => {
    startTimer(time)
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
          <span>
            {hh}:{mm}
          </span>
        </Text>
        <Text fs='32px' color='wheaty_1'>
          <span>:{ss}</span>
        </Text>
      </div>
    </StyledCard>
  )
}
