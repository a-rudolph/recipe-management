import { Box, Flex, Grid, Text } from 'theme-ui'
import { Fragment } from 'react'

type IngredientTableProps = {
  recipe: RecipeType
}

export default function IngredientTable({ recipe }: IngredientTableProps) {
  return (
    <Grid gap={0} pt={2} sx={{ maxWidth: '560px' }} columns={['1fr 2fr']}>
      <Box color='text' p='8px 8px 0' sx={{ textAlign: 'right' }}>
        Quantity
      </Box>
      <Box color='text' p='8px 8px 0' sx={{ textAlign: 'left' }}>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Text>Ingredient</Text>
          <Flex>
            <Text sx={{ mr: 2, display: ['none', 'block'] }}>yield</Text>
            <Text>
              {recipe.yield.amount} {recipe.yield.unit}
            </Text>
          </Flex>
        </Flex>
      </Box>
      {recipe.ingrendients.map((ing) => (
        <Fragment key={ing.name}>
          <Box
            p='4px 8px'
            m='4px 0'
            sx={{ bg: 'muted', textAlign: 'right' }}
          >{`${ing.quantity} ${ing.unit}`}</Box>
          <Box p='4px 8px' m='4px 0' sx={{ bg: 'muted', textAlign: 'left' }}>
            {ing.name}
          </Box>
        </Fragment>
      ))}
    </Grid>
  )
}
