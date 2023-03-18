import { Col, Row } from 'antd'
import ClockOutline from '@/components/icons/ClockOutline'
import fractionize from '@/utils/fractionize'
import { getColor } from '@/styles/themes'
import styled from 'styled-components'
import { Text } from '@/components/atoms'

const StyledTimes = styled.div`
  margin: 16px 0;
  width: max-content;

  .time-row-grid {
    display: grid;
    grid-column-gap: 6px;
    grid-template-columns: 1fr 60px;
  }

  .time-label {
    justify-self: right;
    align-self: center;
    white-space: nowrap;
  }

  .time-divider {
    height: 1px;
    background-color: ${getColor('mono_2')};
  }
`

type TimeDurationsProps = {
  bulk: number
  proof: number
}

export default function TimeDurations({ bulk, proof }: TimeDurationsProps) {
  return (
    <Row justify='end' gutter={8} align='middle'>
      <Col>
        <StyledTimes>
          <TimeRow label='bulk fermentation' hours={bulk} />
          <div className='time-divider' />
          <TimeRow label='proofing' hours={proof} />
        </StyledTimes>
      </Col>
      <Col>
        <Row align='middle' justify='center'>
          <Text style={{ marginTop: '8px' }} color='wheaty_1'>
            <ClockOutline size={56} />
          </Text>
        </Row>
      </Col>
    </Row>
  )
}

const TimeRow = ({ label, hours }: { label: string; hours: number }) => {
  return (
    <div className='time-row-grid'>
      <Text secondary color='text_1' className='time-label'>
        {label}:
      </Text>
      <Text weight={500} color='wheaty_1' fs='h5'>
        {fractionize(hours)} hrs
      </Text>
    </div>
  )
}
