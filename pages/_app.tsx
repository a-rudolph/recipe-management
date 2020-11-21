/** @jsx jsx */
import { BRAND_NAME, defaultTheme } from '@styles/themes'
import { jsx, Grid, ThemeProvider } from 'theme-ui'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Nav } from '@components/Nav'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import Head from 'next/head'
import '@styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { key } = router.query

  const getRecipe = useCallback(() => {
    const recipes = getAvailableRecipes()

    return recipes.find((recipe) => recipe.key === key)
  }, [key])

  const { key: recipeKey, name } = getRecipe() || {}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>{name || BRAND_NAME}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid
        sx={{
          height: '100vh',
          gridTemplateRows: '1fr auto',
          rowGap: 0,
        }}
      >
        <Nav recipeKey={recipeKey} title={name} />
        <Component {...pageProps} />
      </Grid>
    </ThemeProvider>
  )
}

export default MyApp
