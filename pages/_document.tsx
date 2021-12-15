import Document, { Html, Head, Main, NextScript } from 'next/document'
import { BRAND_NAME } from '@styles/themes'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const title = `${BRAND_NAME} - Bread Coach`
    const description = 'wheatifully, bread coach; baking scheduling tool'

    return (
      <Html lang='en'>
        <Head>
          <meta name='application-name' content={title} />
          <meta name='description' content={description} />
          <link rel='manifest' href='/manifest.json' />
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
