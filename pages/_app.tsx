import { BRAND_NAME, theme } from '@styles/themes'
import { TimeContextProvider } from '@hooks/useTimeContext'
import { ThemeProvider } from 'styled-components'
import { BasicLayout } from 'layouts'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import '@styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TimeContextProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>{BRAND_NAME}</title>
          <link rel='icon' href='/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto&family=Lato&display=swap'
            rel='stylesheet'
          ></link>
        </Head>
        <BasicLayout>
          Hello Bread makers
          {/* <Component {...pageProps} /> */}
        </BasicLayout>
      </ThemeProvider>
    </TimeContextProvider>
  )
}
