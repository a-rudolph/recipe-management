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
    <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
      <Container p={2} pt={6} sx={{ maxWidth: '560px' }}>
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
            <Grid columns={['auto ', null, 'auto']}>
              <RecipeTimes times={SATURDAY_WHITE_BREAD.times} />
              <SampleSchedule times={SATURDAY_WHITE_BREAD.times} />
            </Grid>
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
