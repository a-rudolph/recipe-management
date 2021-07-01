import swiss from '@theme-ui/preset-swiss'

export const BRAND_NAME = 'whea·ti·ful·ly'

const palette = {
  ...swiss.colors,
  primary: '#222528',
  secondary: '#fffc47',
  accent: '#c8553d',
  inverted: 'whitesmoke',
  wheaty: '#F6BB63',
}

const darkTheme = {
  text: 'whitesmoke',
  background: palette.primary,
  primary: '#38403b',
  inverted: '#38403b',
  secondary: palette.muted,
  highlight: palette.accent,
  purple: 'hsl(250, 60%, 30%)',
  muted: '#692c20',
  accent: palette.wheaty,
}

const baseNavStyles = {
  width: '100vw',
  height: 'auto',
  zIndex: 50,
  position: 'fixed',
  top: 0,
  transition: 'all .2s ease',
}

const baseButtonStyles = {
  cursor: 'pointer',
  border: '1px solid',
}

export const defaultTheme = {
  ...swiss,
  colors: {
    ...palette,
    modes: {
      dark: darkTheme,
    },
  },
  button: {
    primary: {
      ...baseButtonStyles,
      bg: 'primary',
      borderColor: 'transparent',
    },
    secondary: {
      ...baseButtonStyles,
      color: 'primary',
      bg: 'white',
      borderColor: 'primary',
    },
  },
  card: {
    padding: 3,
    bg: 'muted',
    boxShadow: `1px 1px 2px 1px ${palette.accent}`,
  },
  nav: {
    ...baseNavStyles,
    height: '40px',
    bg: 'rgb(0,0,0,0.45)',
    boxShadow: '0px 10px 10px 10px rgb(0,0,0,0.45)',
    item: {
      p: 2,
    },
    primary: {
      ...baseNavStyles,
      bg: 'primary',
    },
    secondary: {
      ...baseNavStyles,
      bg: 'inverted',
    },
  },
  mask: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    backgroundColor: 'rgb(0,0,0,0.35)',
  },
  height: {
    medium: '52px',
    large: '96px',
    small: '24px',
  },
  logo: {
    transform: 'rotate(170deg)',
  },
  flex: {
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  text: {
    step: {
      color: 'accent',
      fontWeight: 600,
      textAlign: 'center',
    },
  },
  steps: {
    circle: {
      bg: 'accent',
      color: 'inverted',
      borderRadius: '50%',
      height: '120px',
      width: '120px',
      justifyContent: 'center',
      position: 'relative',
      content: {
        position: 'absolute',
        bottom: '44px',
        width: '100%',
      },
      title: {
        fontSize: '18px',
        textAlign: 'center',
        fontWeight: 500,
      },
      time: {
        borderBottom: '1px dashed',
        textAlign: 'center',
        fontSize: '24px',
        lineHeight: 1,
      },
    },
  },
}
