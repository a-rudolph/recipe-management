import { useEffect, useState } from 'react'
import { normalizeTimeValue } from '@utils/formatTime'
import { Row, Text } from '@components/atoms'
import TimeInput from '@components/TimeInput'
import styled from 'styled-components'
import Modal from '@components/Modal'

const StyledModal = styled(Modal)`
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

type SetTimeModalProps = {
  visible: boolean
  onClose: VoidFunction
  onDone: (time: Required<TimeValue>) => void
}

export default function SetTimeModal({
  visible,
  onClose,
  onDone,
}: SetTimeModalProps) {
  const [value, setValue] = useState<TimeValue>({})

  const handleDone = () => {
    // validate 🤢

    setValue((value) => {
      onDone(normalizeTimeValue(value))

      return {}
    })
  }

  useEffect(() => {
    const enterHandler = (e) => {
      if (e.key === 'Enter') {
        handleDone()
      }
    }

    if (visible) {
      window.addEventListener('keydown', enterHandler)
    } else {
      window.removeEventListener('keydown', enterHandler)
    }

    return () => {
      window.removeEventListener('keydown', enterHandler)
    }
  }, [visible])

  const handleCancel = () => {
    onClose()
    setValue({})
  }

  return (
    <StyledModal closeable={false} visible={visible}>
      <Row>
        <Text weight={500} fs='32px'>
          Set timer
        </Text>
      </Row>
      <TimeInput value={value} onChange={setValue} />
      <Row className='footer'>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleDone}>Start</button>
      </Row>
    </StyledModal>
  )
}
