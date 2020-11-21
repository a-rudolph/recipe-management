/** @jsx jsx */
import { Box, Flex, Grid, jsx } from 'theme-ui'
import getAvailableRecipes from '../src/utils/getAvailableRecipes'
import RecipeCard from '../src/components/RecipeCard'
import Logo from '../src/components/Logo'

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
          <span
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              fontSize: '14px',
            }}
          >
            Photo by{' '}
            <a
              sx={{ color: 'text' }}
              href='https://unsplash.com/@gaellemarcel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
            >
              Gaelle Marcel
            </a>{' '}
            on{' '}
            <a
              sx={{ color: 'text' }}
              href='https://unsplash.com/s/photos/wheat?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
            >
              Unsplash
            </a>
          </span>
        </Box>
        <Box variant='mask' />
      </Box>
      <Box p='3' sx={{ height: '100%' }}>
        <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <Grid sx={{ maxWidth: '560px', width: '100%' }}>
            <Flex sx={{ width: '100%' }}>
              <Logo.Title />
            </Flex>
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
