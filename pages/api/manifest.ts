import { NextApiHandler } from 'next'
import { theme } from '@styles/themes'

const getShortName = (mode: string) => {
  if (mode === 'production') return 'Wheatifully'

  return mode
}

const handler: NextApiHandler = (req, res) => {
  const mode = process.env.NODE_ENV

  const manifest = {
    name: 'whea·ti·ful·ly - bread coach',
    short_name: getShortName(mode),
    icons: [
      {
        src: '/icons/logo.svg',
        sizes: '160x164',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/android-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: theme.colors.primary_1,
    background_color: theme.colors.secondary_1,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
  }

  res.status(200).json(manifest)
}

export default handler
