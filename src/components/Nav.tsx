/** @jsx jsx */
import { useCallback } from 'react'
import { jsx, Button, Box, Flex, Text } from 'theme-ui'
import useScrollListener from '../hooks/useScrollListener'

export const Nav = () => {
  const { scrollPosition } = useScrollListener()

  const getNavStyle = useCallback(() => {
    return {
      variant: `nav.${scrollPosition < 25 ? 'primary' : 'secondary'}`,
      boxShadow: scrollPosition < 42 ? '0' : '0px 1px 1px 1px rgb(0,0,0,0.45)',
    }
  }, [scrollPosition])

  const handleButton = () => console.log(scrollPosition)

  return (
    <Box sx={getNavStyle()}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text sx={{ variant: 'nav.item', opacity: 0 }}>yeastily</Text>
        <Button
          as='button'
          onClick={handleButton}
          sx={{
            variant: `button.primary`,
          }}
        >
          Button
        </Button>
      </Flex>
    </Box>
  )
}
