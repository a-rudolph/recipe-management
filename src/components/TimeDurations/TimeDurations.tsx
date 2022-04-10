import { Button, Row, Text } from '@components/atoms'
import { getColor } from '@styles/themes'
import ClockOutline from '@components/icons/ClockOutline'
import fractionize from '@utils/fractionize'
import RightIcon from '@components/icons/Right'
import styled from 'styled-components'

const StyledTimes = styled.div`
  margin: 20px 0;
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
    margin: 4px 0;
    background-color: ${getColor('mono_2')};
  }
`

const StyledRow = styled(Row)`
  justify-content: end;

  .clock-outline-icon {
    margin: 0 8px;
  }
`

type TimeDurationsProps = {
  bulk: number
  proof: number
  onClock?: VoidFunction
}

export default function TimeDurations({
  bulk,
  proof,
  onClock,
}: TimeDurationsProps) {
  return (
    <StyledRow align='center'>
      <StyledTimes>
        <TimeRow label='bulk fermentation' hours={bulk} />
        <div className='time-divider' />
        <TimeRow label='proofing' hours={proof} />
      </StyledTimes>
      <Button type='ghost' onClick={onClock}>
        <Row align='center' justify='center'>
          <Text style={{ marginTop: '4px' }} color='wheaty_1'>
            <ClockOutline size={56} />
          </Text>
          {onClock && (
            <Text color='wheaty_1'>
              <RightIcon size={12} />
            </Text>
          )}
        </Row>
      </Button>
    </StyledRow>
  )
}

const TimeRow = ({ label, hours }: { label: string; hours: number }) => {
  return (
    <div className='time-row-grid'>
      <Text.accent className='time-label'>{label}:</Text.accent>
      <Text weight={500} fs='h5'>
        {fractionize(hours)} hrs
      </Text>
    </div>
  )
}
