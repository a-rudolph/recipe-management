/** @jsx jsx */
import { Box, Flex, Grid, jsx, Styled, Text } from 'theme-ui'
import moment from 'moment'

type SampleScheduleProps = {
  times: RecipeType['times']
}

export default function SampleSchedule(props: SampleScheduleProps) {
  const { times } = props

  const start = moment()
  const shape = moment(start).add(times.bulk[0], 'h')
  const bake = moment(shape).add(times.proof[0], 'h')
  const timeValues = {
    start,
    shape,
    bake,
  }

  const timeStyles = {
    color: 'primary',
    fontWeight: 500,
    padding: '0 8px',
  }

  return (
    <Grid gap={0} columns={['auto']}>
      <Box
        sx={{
          p: 4,
          pt: 2,
          pb: 0,
          bg: 'something',
          color: 'white',
          borderRadius: '5px 5px 0 0',
        }}
      >
        <Styled.h3 sx={{ m: 0 }}>Sample schedule</Styled.h3>
      </Box>
      <Box
        sx={{
          position: 'relative',
          p: 2,
          pt: 1,
          pb: 3,
          bg: 'muted',
          borderRadius: '0 0 5px 5px',
        }}
      >
        {['start', 'shape', 'bake'].map((key) => (
          <Flex>
            {key}:
            <Text
              sx={{
                fontWeight: 500,
                margin: '0 8px',
              }}
            >
              {timeValues[key].format('h:mm:ss A')}
            </Text>
          </Flex>
        ))}
      </Box>
    </Grid>
  )
}
