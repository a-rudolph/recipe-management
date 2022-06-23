import '@styles/index.less'
import AppContext from '@hooks/AppContext'
import type { AppProps } from 'next/app'
import { BasicLayout } from 'layouts'
import { BRAND_NAME } from '@styles/themes'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Head>
        <title>{BRAND_NAME}</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </AppContext>
  )
}
