/** @jsx jsx */
import { Box, Flex, Grid, jsx } from 'theme-ui'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import RecipeCard from '@components/RecipeCard'

type HomeProps = {
  recipes: RecipeType[]
}

export default function Home({ recipes }: HomeProps) {
  const startingStyle: { [key: string]: import('theme-ui').SxStyleProp } = {
    banner: {
      height: '50vh',
      position: 'relative',
    },
    placeholder: {
      height: '50vh',
      position: 'absolute',
    },
  }

  return (
    <Grid sx={{ height: '50vh' }} gap={0}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={startingStyle.placeholder} />
        <Box sx={startingStyle.banner}>
          <img
            src='/bg.jpg'
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box variant='mask' />
      </Box>
      <Box p='3' sx={{ height: '100%' }}>
        <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <Grid sx={{ maxWidth: '560px', width: '100%' }}>
            {recipes.map(({ key, name }) => (
              <RecipeCard key={key} recipeKey={key} name={name} />
            ))}
          </Grid>
        </Flex>
      </Box>
    </Grid>
  )
}

export const getStaticProps = async () => {
  const recipes = getAvailableRecipes()

  return {
    props: {
      recipes,
    },
  }
}
