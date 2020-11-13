/** @jsx jsx */
import { Flex, jsx, Box, Container, Grid } from 'theme-ui'
import { SATURDAY_WHITE_BREAD } from '../../src/constants/recipes'
import IngredientTable from '../../src/components/IngredientTable'
import moment from 'moment'
import RecipeTimes from '../../src/components/RecipeInfo'
import SampleSchedule from '../../src/components/SampleSchedule'

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
  return (
    <Box sx={{ pt: 6, flexDirection: 'column', flexGrow: 1 }}>
      <Container p={4} pt={2}>
        <Flex
          sx={{
            p: [0],
            justifyContent: 'center',
            width: ['100%', 'auto'],
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Grid columns={['auto', 'auto auto']}>
              <Box>
                <RecipeTimes times={SATURDAY_WHITE_BREAD.times} />
                <IngredientTable recipe={SATURDAY_WHITE_BREAD} />
              </Box>
              <SampleSchedule times={SATURDAY_WHITE_BREAD.times} />
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
