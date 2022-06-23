import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { BRAND_NAME, theme } from '@styles/themes'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const title = `${BRAND_NAME} - bread coach`
    const description = 'wheatifully, bread coach; baking scheduling tool'

    const manifest = '/api/manifest'

    return (
      <Html lang='en'>
        <Head>
          <meta name='application-name' content={title} />
          <meta name='description' content={description} />
          <meta name='theme-color' content={theme.colors.primary_1} />
          <link rel='manifest' href={manifest} />
          <link rel='shortcut icon' href='/favicon.ico' />

          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta name='apple-mobile-web-app-title' content={title} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-tap-highlight' content='no' />

          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/icons/apple-icon-152x152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/icons/apple-icon-180x180.png'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Lato:ital@1&family=Mukta+Mahee&display=swap'
            rel='stylesheet'
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
