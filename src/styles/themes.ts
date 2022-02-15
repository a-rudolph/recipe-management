import _get from 'lodash/get'

export const BRAND_NAME = 'whea·ti·ful·ly'

// fonts too

export const getColor =
  (color: keyof ThemeType['colors']) =>
  ({ theme }: { theme: ThemeType }) => {
    return _get(theme, `colors.${color}`, theme.colors.wheaty_2)
  }

type ThemeType = typeof theme

export const getStyle = <
  A extends keyof ThemeType,
  B extends keyof ThemeType[A]
>(
  ...args: [A, B]
) => {
  return ({ theme }) => _get(theme, args.join('.'))
}

export const theme = {
  colors: {
    wheaty_1: '#F6BB63',
    wheaty_2: '#FFE3B9', // more monoy than wheaty tbh
    wheaty_3: '#B2A086', // more monoy than wheaty tbh
    wheaty_4: '#867A69', // more monoy than wheaty tbh
    mono_1: '#222528',
    mono_2: '#484F55',
    mono_3: '#F3EEED',
    secondary_1: '#692C20',
    bg_1: '#082032',
    bg_2: '#1C405B',
  },
  shade: {
    button: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    small: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    big: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
}
