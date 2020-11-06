import swiss from '@theme-ui/preset-swiss'

export const defaultTheme = {
  ...swiss,
  button: {
    cursor: 'pointer',
  },
  shadowy: {
    boxShadow: '1px 1px 1px 1px',
  },
  nav: {
    bg: 'muted',
    boxShadow: '0px 1px 2px 0 rgb(0,0,0,0.25)',
    item: {
      p: 3,
      borderRight: '1px solid',
      borderColor: 'primary',
    },
  },
  height: {
    medium: '32px',
    large: '96px',
    small: '24px',
  },
  logo: {
    transform: 'rotate(140deg)',
  },
}
