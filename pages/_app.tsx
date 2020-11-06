/** @jsx jsx */
import { jsx, Grid, ThemeProvider } from 'theme-ui'
import { defaultTheme } from '../src/themes'
import Footer from '../src/components/Footer'
import { Nav } from '../src/components/Nav'
import Head from 'next/head'
import '../src/styles/index.css'

function MyApp({ Component, pageProps }) {
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
