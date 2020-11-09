/** @jsx jsx */
import { Flex, jsx, Box, Container } from 'theme-ui'
import { SATURDAY_WHITE_BREAD } from '../../src/constants/recipes'
import IngredientTable from '../../src/components/IngredientTable'
import moment from 'moment'

/**
 * total time,
 * ferment time,
 * proof time,
 * sample timeline,
 * - [mix = now]
 * - bulk ferment
 * - [shape += 12-14]
 * - proof
 * - [bake += 5]
 * recipe,
 * schedule,
 */

type SampleTimeStateType = {
  start: moment.Moment
  shape: moment.Moment
  bake: moment.Moment
}

export default function SaturdayWhiteBread() {
  const { times } = SATURDAY_WHITE_BREAD

  const start = moment()
  const shape = moment(start).add(times.bulk[0], 'h')
  const bake = moment(shape).add(times.proof[0], 'h')

  const sampleTimes: SampleTimeStateType = {
    start,
    shape,
    bake,
  }

  return (
    <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
      <Container p={2} pt={6} sx={{ maxWidth: '560px' }}>
        <Flex
          sx={{
            p: [0, '16px 72px'],
            justifyContent: 'center',
            width: ['100%', 'auto'],
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Flex>Bulk fermentation time: {times.bulk.join('-')} hours</Flex>
            <Flex>Proof time: {times.proof.join('-')} hours</Flex>
            <Flex>Sample schedule</Flex>
            <Flex>Start {sampleTimes?.start.format('h:mm:ss A')}</Flex>
            <Flex>Shape {sampleTimes?.shape.format('h:mm:ss A')}</Flex>
            <Flex>Bake {sampleTimes?.bake.format('h:mm:ss A')}</Flex>
            <IngredientTable recipe={SATURDAY_WHITE_BREAD} />
            <IngredientTable recipe={SATURDAY_WHITE_BREAD} />
            <IngredientTable recipe={SATURDAY_WHITE_BREAD} />
            <IngredientTable recipe={SATURDAY_WHITE_BREAD} />
            <IngredientTable recipe={SATURDAY_WHITE_BREAD} />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
