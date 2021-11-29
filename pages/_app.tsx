/** @jsx jsx */
import { BRAND_NAME, defaultTheme } from '@styles/themes'
import { TimeContextProvider } from '@hooks/useTimeContext'
import { jsx, ThemeProvider } from 'theme-ui'
import { BasicLayout } from 'layouts'
import { useRouter } from 'next/router'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useMemo } from 'react'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import Head from 'next/head'
import '@styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
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
        <BasicLayout>Hello Bread makers</BasicLayout>
      </ThemeProvider>
    </TimeContextProvider>
  )
}
