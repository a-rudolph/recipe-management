import swiss from '@theme-ui/preset-swiss'

export const BRAND_NAME = 'whea·ti·ful·ly'

const palette = {
  primary: '#222528',
  secondary: '#fffc47',
  accent: '#c8553d',
}

const testNewPalette = {
  primary: '#214646',
  secondary: '#fffc47',
  accent: '#dc8e1a',
}

const baseNavStyles = {
  p: 2,
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
    ...swiss.colors,
    ...palette,
    // primary: testNewPalette.primary,
    // secondary: testNewPalette.secondary,
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
      borderRight: '1px solid',
      borderColor: 'primary',
    },
    primary: {
      ...baseNavStyles,
      bg: 'primary',
    },
    secondary: {
      ...baseNavStyles,
      bg: 'white',
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
  steps: {
    circle: {
      bg: 'accent',
      color: 'white',
      borderRadius: '50%',
      height: '120px',
      width: '120px',
      justifyContent: 'center',
      alignItems: 'center',
      title: {
        fontSize: '32px',
      },
      time: {
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: 1,
      },
    },
  },
}
