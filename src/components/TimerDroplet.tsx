import TimeSelect from './TimeSelect'
import { Box, Flex, Text } from 'theme-ui'
import { Moment } from 'moment'

type TimerDropletProps = {
  step: Step
  onTimeClick?: (step: Step) => void
  onTimeChange?: ChangeHandler<Moment>
}

export default function TimerDroplet({
  step,
  onTimeChange,
  onTimeClick = () => {},
}: TimerDropletProps) {
  const { time, title } = step

  const handleClick = () => {
    onTimeClick(step)
  }

  return (
    <Flex onClick={handleClick} variant='steps.circle'>
      <Box variant='steps.circle.content'>
        <Text variant='steps.circle.title'>{title}</Text>
        <TimeSelect
          value={time}
          onChange={onTimeChange}
          variant='steps.circle.time'
        />
      </Box>
    </Flex>
  )
}

const dividerSx = {
  bg: 'accent',
  width: '4px',
  height: '16px',
  m: '8px auto',
  mb: 0,
}

const Divider = () => (
  <Flex>
    <Box sx={dividerSx} />
  </Flex>
)

TimerDroplet.Divider = Divider
