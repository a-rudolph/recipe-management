/** @jsx jsx */
import { BRAND_NAME, defaultTheme } from '../src/themes'
import { jsx, Grid, ThemeProvider } from 'theme-ui'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Nav } from '../src/components/Nav'
// import Footer from '../src/components/Footer'
import Head from 'next/head'
import '../src/styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>{BRAND_NAME}</title>
        <link rel='icon' href='/wheat.ico' />
      </Head>
      <Grid
        sx={{
          height: '100vh',
          gridTemplateRows: '1fr auto',
          rowGap: 0,
        }}
      >
        <Nav />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </Grid>
    </ThemeProvider>
  )
}

export default MyApp
