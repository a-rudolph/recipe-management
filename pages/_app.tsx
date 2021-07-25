/** @jsx jsx */
import { BRAND_NAME, defaultTheme } from '@styles/themes'
import { jsx, Grid, ThemeProvider } from 'theme-ui'
import { TimeContextProvider } from '@hooks/useTimeContext'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Nav } from '@components/Nav'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import Head from 'next/head'
import '@styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { key } = router.query

  const recipe = useMemo(() => {
    const recipes = getAvailableRecipes()

    return recipes.find((recipe) => recipe.key === key)
  }, [key])

  const pageTitle = recipe?.name

  return (
    <TimeContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <Head>
          <title>{pageTitle || BRAND_NAME}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Grid
          sx={{
            gridTemplateRows: '1fr auto',
            rowGap: 0,
          }}
        >
          <Nav title={pageTitle} />
          <Component {...pageProps} />
        </Grid>
      </ThemeProvider>
    </TimeContextProvider>
  )
}

export default MyApp
