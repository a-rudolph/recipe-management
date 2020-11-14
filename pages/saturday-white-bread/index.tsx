/** @jsx jsx */
import { Flex, jsx, Box, Container, Grid, Button } from 'theme-ui'
import { SATURDAY_WHITE_BREAD } from '../../src/constants/recipes'
import IngredientTable from '../../src/components/IngredientTable'
import SampleSchedule from '../../src/components/SampleSchedule'
import RecipeTimes from '../../src/components/RecipeInfo'
import moment from 'moment'
import Link from 'next/link'

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
              <Box sx={{ display: ['none', 'flex'] }}>
                <SampleSchedule times={SATURDAY_WHITE_BREAD.times} />
              </Box>
            </Grid>
          </Box>
        </Flex>
        <Flex
          sx={{
            marginTop: 3,
            display: ['flex', 'none'],
            justifyContent: 'flex-end',
            marginRight: '-32px',
          }}
        >
          <Link href='/saturday-white-bread/schedule'>
            <Button
              bg='accent'
              pl={3}
              pr={5}
              sx={{ borderRadius: '16px 0 0 16px' }}
            >
              see schedule
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
