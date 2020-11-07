/** @jsx jsx */
import { Flex, jsx, Styled } from 'theme-ui'
import { Box, Container, Grid, Text } from 'theme-ui'

type RecipeType = {
  yield: {
    amount: number
    unit: string
  }
  ingrendients: IngredientType[]
}

type IngredientType = {
  quantity: number
  unit: string
  name: string
}

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
    <Box mt='64px' sx={{ flexDirection: 'column', flexGrow: 1 }}>
      <Container p={2} sx={{ maxWidth: '560px' }}>
        <Styled.h3>Hello saturday white bread</Styled.h3>
        <Flex
          sx={{
            p: [0, '16px 72px'],
            justifyContent: 'center',
            width: ['100%', 'auto'],
          }}
        >
          <Grid gap={0} pt={2} sx={{ width: '100%' }} columns={['1fr 2fr']}>
            <Box color='primary' p={2} sx={{ textAlign: 'right' }}>
              Quantity
            </Box>
            <Box color='primary' p={2} sx={{ textAlign: 'left' }}>
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Text>Ingredient</Text>
                <Text>
                  yield {recipe.yield.amount} {recipe.yield.unit}
                </Text>
              </Flex>
            </Box>
            {recipe.ingrendients.map((ing) => (
              <>
                <Box
                  p='4px 8px'
                  m='4px 0'
                  sx={{ bg: 'muted', textAlign: 'right' }}
                >{`${ing.quantity} ${ing.unit}`}</Box>
                <Box
                  p='4px 8px'
                  m='4px 0'
                  sx={{ bg: 'muted', textAlign: 'left' }}
                >
                  {ing.name}
                </Box>
              </>
            ))}
            <Box></Box>
          </Grid>
        </Flex>
      </Container>
    </Box>
  )
}
