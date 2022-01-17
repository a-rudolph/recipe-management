import { BRAND_NAME, theme } from '@styles/themes'
import { TimerProvider } from '@hooks/useTimerContext'
import { ThemeProvider } from 'styled-components'
import { BasicLayout } from 'layouts'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '@styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TimerProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>{BRAND_NAME}</title>
          <link rel='icon' href='/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto&family=Lato:ital@1&display=swap'
            rel='stylesheet'
          ></link>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
        </Head>
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      </ThemeProvider>
    </TimerProvider>
  )
}
