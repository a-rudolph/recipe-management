/** @jsx jsx */
import { Flex, jsx, Styled } from 'theme-ui'
import { Box, Container } from 'theme-ui'
import IngredientTable from '../../src/components/IngredientTable'

/**
 * proof time,
 * ferment time,
 * total time,
 * sample timeline (from now),
 * recipe,
 * schedule,
 */

export default function SaturdayWhiteBread() {
  const recipe: RecipeType = {
    yield: {
      amount: 2,
      unit: 'Loaves',
    },
    ingrendients: [
      {
        quantity: 1000,
        unit: 'g',
        name: 'white flour',
      },
      {
        quantity: 720,
        unit: 'g',
        name: '90ºF - 95ºF water',
      },
      {
        quantity: 21,
        unit: 'g',
        name: 'fine sea salt',
      },
      {
        quantity: 4,
        unit: 'g',
        name: 'instant yeast',
      },
    ],
  }

  return (
    <Box pt={4} sx={{ flexDirection: 'column', flexGrow: 1 }}>
      <Container p={2} sx={{ maxWidth: '560px' }}>
        <Box
          sx={{
            mt: 4,
            width: '100%',
            height: '58px',
            bg: 'white',
          }}
        >
          <Styled.h3 sx={{ m: 0, fontWeight: 700, fontSize: 4 }}>
            Saturday white bread
          </Styled.h3>
        </Box>
        <Flex
          sx={{
            p: [0, '16px 72px'],
            justifyContent: 'center',
            width: ['100%', 'auto'],
          }}
        >
          <Box
            sx={{
              width: ['100%', 'auto'],
            }}
          >
            <IngredientTable recipe={recipe} />
            <IngredientTable recipe={recipe} />
            <IngredientTable recipe={recipe} />
            <IngredientTable recipe={recipe} />
            <IngredientTable recipe={recipe} />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
