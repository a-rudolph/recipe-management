import { Box, Flex, Text } from 'theme-ui'

type TimerDropletProps = {
  step: Step
  onTimeClick?: (step: Step) => void
}

export default function TimerDroplet({
  step,
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
        <Text variant='steps.circle.time'>{time.format('HH:mm A')}</Text>
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
