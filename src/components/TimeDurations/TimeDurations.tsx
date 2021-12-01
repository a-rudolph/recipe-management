import { Row, Text } from '@components/atoms'
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
  }

  .time-divider {
    height: 1px;
    margin: 8px 0;
    background-color: ${({ theme }) => theme.colors.wheaty_1};
  }
`

const StyledRow = styled(Row)`
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
    <StyledRow>
      <StyledTimes>
        <TimeRow label='bulk fermentation' hours={bulk} />
        <div className='time-divider' />
        <TimeRow label='proofing' hours={proof} />
      </StyledTimes>
      <Text color='wheaty_1'>
        <ClockOutline size={56} />
      </Text>
      {onClock && (
        <Text color='wheaty_1'>
          <RightIcon size={12} />
        </Text>
      )}
    </StyledRow>
  )
}

const TimeRow = ({ label, hours }: { label: string; hours: number }) => {
  return (
    <div className='time-row-grid'>
      <Text
        className='time-label'
        fs='18px'
        secondary
        weight={400}
        color='wheaty_2'
      >
        {label}:
      </Text>
      <Text weight={500} fs='18px' color='wheaty_1'>
        {fractionize(hours)} hrs
      </Text>
    </div>
  )
}