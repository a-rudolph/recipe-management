import { Box, Flex, Grid, Text } from 'theme-ui'

type IngredientTableProps = {
  recipe: RecipeType
}

export default function IngredientTable({ recipe }: IngredientTableProps) {
  return (
    <Grid gap={0} pt={2} sx={{ width: '100%' }} columns={['1fr 2fr']}>
      <Box color='primary' p='8px 8px 0' sx={{ textAlign: 'right' }}>
        Quantity
      </Box>
      <Box color='primary' p='8px 8px 0' sx={{ textAlign: 'left' }}>
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
            key={`${ing.name}-qty`}
            p='4px 8px'
            m='4px 0'
            sx={{ bg: 'muted', textAlign: 'right' }}
          >{`${ing.quantity} ${ing.unit}`}</Box>
          <Box
            key={`${ing.name}-name`}
            p='4px 8px'
            m='4px 0'
            sx={{ bg: 'muted', textAlign: 'left' }}
          >
            {ing.name}
          </Box>
        </>
      ))}
    </Grid>
  )
}
