import { Box, Flex, Grid, Text } from 'theme-ui'
import moment from 'moment'

type SampleScheduleProps = {
  times: RecipeType['times']
}

const dividerSx = {
  bg: 'accent',
  width: '4px',
  height: '16px',
  margin: '8px auto',
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

  const timeStyles = {
    color: 'primary',
    fontWeight: 500,
    padding: '0 8px',
  }

  const renderTimeDivider = (time: number) => {
    return (
      <Box>
        <Flex>
          <Box sx={{ ...dividerSx, mb: 0 }} />
        </Flex>
        <Grid gap={1} columns={['1fr 58px']}>
          <Text sx={{ lineHeight: 1, textAlign: 'right' }}>{time}</Text>
          <Text sx={{ lineHeight: 1 }}>hours</Text>
        </Grid>
        <Flex>
          <Box sx={{ ...dividerSx, mt: 1 }} />
        </Flex>
      </Box>
    )
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
      {renderTimeDivider(times.bulk[0])}
      <Flex variant='steps.circle'>
        <Box>
          <Text variant='steps.circle.title'>Shape</Text>
          <Text variant='steps.circle.time'>
            {timeMoments.shape.format('h:mm A')}
          </Text>
        </Box>
      </Flex>
      {renderTimeDivider(times.proof[0])}
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
