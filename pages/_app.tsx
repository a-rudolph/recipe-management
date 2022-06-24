import '@styles/index.less'
import AppContext from '@hooks/AppContext'
import { AppRouter } from '@pages/api/trpc/[trpc]'
import type { AppType } from 'next/dist/shared/lib/utils'
import { BasicLayout } from 'layouts'
import { BRAND_NAME } from '@styles/themes'
import Head from 'next/head'
import { withTRPC } from '@trpc/next'

const MyApp: AppType = ({ Component, pageProps }) => {
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

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    console.log('process.env.VERCEL_URL: ', process.env.VERCEL_URL)

    return {
      url: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc',
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
