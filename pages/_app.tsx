import { Nav } from '../src/components/Nav'
import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../src/themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
