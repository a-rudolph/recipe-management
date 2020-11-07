/** @jsx jsx */
import { jsx, Grid, ThemeProvider } from 'theme-ui'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { defaultTheme } from '../src/themes'
import Footer from '../src/components/Footer'
import Head from 'next/head'
import { Nav } from '../src/components/Nav'
import '../src/styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Cooking Yeastily</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid
        sx={{
          height: '100vh',
          gridTemplateRows: 'auto 1fr auto',
          rowGap: 0,
        }}
      >
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </Grid>
    </ThemeProvider>
  )
}

export default MyApp
