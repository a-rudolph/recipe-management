import { Box, Flex, Grid, Text } from 'theme-ui'
import moment from 'moment'

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

  const start = moment()
  const shape = moment(start).add(times.bulk[0], 'h')
  const bake = moment(shape).add(times.proof[0], 'h')
  const timeMoments = {
    start,
    shape,
    bake,
  }

  return (
    <Grid gap={0} columns={['120px']}>
      <Flex variant='steps.circle'>
        <Box>
          <Text variant='steps.circle.title'>Mix</Text>
          <Text variant='steps.circle.time'>
            {timeMoments.start.format('h:mm A')}
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
            {timeMoments.shape.format('h:mm A')}
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
            {timeMoments.bake.format('h:mm A')}
          </Text>
        </Box>
      </Flex>
    </Grid>
  )
}
