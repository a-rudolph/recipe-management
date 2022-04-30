import { BasicLayout } from 'layouts'
import { BRAND_NAME } from '@styles/themes'
import { AppProps } from 'next/app'
import AppContext from '@hooks/AppContext'
import Head from 'next/head'
import '@styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Head>
        <title>{BRAND_NAME}</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:ital@1&family=Mukta+Mahee&display=swap'
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
    </AppContext>
  )
}
