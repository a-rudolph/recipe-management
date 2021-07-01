import { useState } from 'react'
import { Box, Flex, Select, Text } from 'theme-ui'
import TimeSelect from './TimeSelect'

type TimerDropletProps = {
  step: Step
  onTimeClick?: (step: Step) => void
}

export default function TimerDroplet({
  step,
  onTimeClick = () => {},
}: TimerDropletProps) {
  const { time, title } = step

  const [value, setValue] = useState(time)

  const handleClick = () => {
    onTimeClick(step)
  }

  return (
    <Flex onClick={handleClick} variant='steps.circle'>
      <Box variant='steps.circle.content'>
        <Text variant='steps.circle.title'>{title}</Text>
        <TimeSelect
          value={value}
          onChange={(m) => setValue(m)}
          variant='steps.circle.time'
        >
          <option>{time.format('HH:mm A')}</option>
        </TimeSelect>
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
