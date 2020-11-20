/** @jsx jsx */
import { jsx, Text, Flex, Box, Container, Grid, Button } from 'theme-ui'
import { SATURDAY_WHITE_BREAD } from '../../src/constants/recipes'
import IngredientTable from '../../src/components/IngredientTable'
import SampleSchedule from '../../src/components/SampleSchedule'
import RecipeTimes from '../../src/components/RecipeInfo'
import RightIcon from '../../src/components/icons/Right'
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
            <Grid columns={['auto', 'minmax(auto, 580px) auto 1fr']}>
              <Box>
                <RecipeTimes times={SATURDAY_WHITE_BREAD.times} />
                <IngredientTable recipe={SATURDAY_WHITE_BREAD} />
              </Box>
              <Box
                sx={{
                  display: ['none', 'flex'],
                  marginTop: '-40px',
                  width: 'max-content',
                }}
              >
                <SampleSchedule times={SATURDAY_WHITE_BREAD.times} />
              </Box>
              <Box
                sx={{
                  mt: '-32px',
                  height: '36px',
                  borderBottom: '2px solid',
                  borderColor: 'accent',
                  display: ['none', 'flex'],
                  justifyContent: 'flex-end',
                }}
              >
                <Link href='/'>
                  <Flex
                    sx={{
                      px: 3,
                      cursor: 'pointer',
                      color: 'accent',
                      transition: 'all .2s ease',
                      '.right-icon': {
                        transition: 'transform .4s ease',
                        transform: 'translateX(-4px)',
                      },
                      ':hover': {
                        color: '#f2684c',
                        '.right-icon': {
                          transform: 'translateX(-2px)',
                        },
                      },
                    }}
                  >
                    <Text sx={{ fontWeight: '500', alignSelf: 'center' }}>
                      see full schedule
                    </Text>
                    <RightIcon />
                  </Flex>
                </Link>
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
              sx={{ borderRadius: '20px 0 0 20px' }}
            >
              see schedule
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
