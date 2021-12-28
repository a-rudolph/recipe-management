const getShortName = (mode) => {
  if (mode === 'production') return 'Wheatifully'

  return mode
}

export default function handler(req, res) {
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
    theme_color: '#222528',
    background_color: '#082032',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
  }

  res.status(200).json(manifest)
}
