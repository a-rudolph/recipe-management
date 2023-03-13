import '@styles/index.less'
import AppContext from '@hooks/AppContext'
import { AppRouter } from '@pages/api/trpc/[trpc]'
import type { AppType } from 'next/dist/shared/lib/utils'
import { BasicLayout } from 'layouts'
import { BRAND_NAME } from '@styles/themes'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useSetDevice } from '@hooks/useDeviceType'
import { withTRPC } from '@trpc/next'

const SetupLocatorUI = dynamic(() => import('@utils/locator'), {
  ssr: false,
})

const MyApp: AppType = ({ Component, pageProps }) => {
  useSetDevice()

  return (
    <AppContext>
      <SetupLocatorUI />
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

const getBaseUrl = () => {
  if (process.browser) return '' // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    return {
      url: `${getBaseUrl()}/api/trpc`,
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
