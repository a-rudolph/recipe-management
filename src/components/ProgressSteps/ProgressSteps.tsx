import { Col, Row } from 'antd'
import _noop from 'lodash/noop'
import styled from 'styled-components'

type ProgressStepProps = {
  total: number
  current: number
  showing?: number
  onStepClick?: (step: number) => void
}

const ProgressItem = styled.button<{
  $isShowing: boolean
  $state: 'past' | 'current' | 'future'
}>`
  border: none;
  cursor: pointer;

  height: 4px;
  width: 40px;

  background-color: ${({ $isShowing, $state, theme }) => {
    if ($isShowing && $state !== 'current') {
      return theme.colors.text_2
    }

    switch ($state) {
      case 'current':
        return theme.colors.wheaty_1
      case 'past':
      case 'future':
      default:
        return theme.colors.secondary_1
    }
  }};
`

const ProgressSteps: React.FC<ProgressStepProps> = ({
  total,
  current,
  showing,
  onStepClick = _noop,
}) => {
  const steps = Array.from({ length: total })

  return (
    <Row gutter={8} style={{ marginBottom: '16px' }}>
      {steps.map((_, index) => {
        const state =
          index < current ? 'past' : index === current ? 'current' : 'future'

        const isShowing = index === showing

        return (
          <Col key={index}>
            <ProgressItem
              onClick={() => {
                onStepClick(index)
              }}
              $isShowing={isShowing}
              $state={state}
            />
          </Col>
        )
      })}
    </Row>
  )
}

export default ProgressSteps
