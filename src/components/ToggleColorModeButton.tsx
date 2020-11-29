import { Box, Flex, useColorMode } from 'theme-ui'
import DarkIcon from './icons/Dark'
import SunIcon from './icons/Sun'

export default function ToggleButton() {
  const [colorMode, setColorMode] = useColorMode()
  const handleColorMode = () => {
    if (colorMode === 'default') {
      setColorMode('dark')
      return
    }
    setColorMode('default')
  }

  return (
    <Flex
      sx={{
        justifyContent: 'flex-end',
        bg: colorMode === 'default' ? 'purple' : 'background',
        color: colorMode === 'default' ? 'inverted' : '#fff50d',
        position: 'absolute',
        cursor: 'pointer',
        right: 0,
        p: 1,
        height: '100%',
        width: '72px',
        clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 0)',
        '@keyframes wiggle': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(15deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        ':hover': {
          svg: {
            animation: 'wiggle .3s',
          },
        },
      }}
      onClick={handleColorMode}
    >
      {colorMode === 'default' ? <DarkIcon size={24} /> : <SunIcon size={24} />}
    </Flex>
  )
}
