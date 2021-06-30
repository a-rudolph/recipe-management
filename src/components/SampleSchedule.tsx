import { Box, Flex, Text } from 'theme-ui'
import { useState } from 'react'
import moment from 'moment'
import Modal from './Modal'

type SampleScheduleProps = {
  times: RecipeType['times']
}

const dividerSx = {
  bg: 'accent',
  width: '4px',
  height: '16px',
  m: '8px auto',
  mb: 0,
}

export default function SampleSchedule(props: SampleScheduleProps) {
  const { times } = props

  const [visible, setVisible] = useState(false)

  const start = moment()
  const shape = moment(start).add(times.bulk[0], 'h')
  const bake = moment(shape).add(times.proof[0], 'h')
  const timeMoments = {
    start,
    shape,
    bake,
  }

  return (
    <Box sx={{ width: '120px' }}>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        Select start time
      </Modal>
      <Flex onClick={() => setVisible(true)} variant='steps.circle'>
        <Box>
          <Text variant='steps.circle.title'>Mix</Text>
          <Text variant='steps.circle.time'>
            {timeMoments.start.format('HH:mm A')}
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Box sx={dividerSx} />
      </Flex>
      <Flex variant='steps.circle'>
        <Box>
          <Text variant='steps.circle.title'>Shape</Text>
          <Text variant='steps.circle.time'>
            {timeMoments.shape.format('HH:mm A')}
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Box sx={dividerSx} />
      </Flex>
      <Flex variant='steps.circle'>
        <Box>
          <Text variant='steps.circle.title'>Bake</Text>
          <Text variant='steps.circle.time'>
            {timeMoments.bake.format('HH:mm A')}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
