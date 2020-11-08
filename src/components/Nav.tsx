/** @jsx jsx */
import { useCallback } from 'react'
import { jsx, Button, Box, Flex, Text, Styled } from 'theme-ui'
import useScrollListener from '../hooks/useScrollListener'
import { useRouter } from 'next/router'

export const Nav = () => {
  const { scrollPosition } = useScrollListener()
  const { pathname } = useRouter()
  const isHomePage = pathname === '/'

  const getNavStyle = useCallback(() => {
    return {
      variant: `nav.${scrollPosition < 25 ? 'primary' : 'secondary'}`,
      boxShadow: scrollPosition < 57 ? '0' : '0px 1px 1px 1px rgb(0,0,0,0.45)',
    }
  }, [scrollPosition])

  const getTitlePosition = useCallback(() => {
    const calculated = 72 - scrollPosition
    if (calculated < 15) return 15
    return calculated
  }, [scrollPosition])

  const handleButton = () => console.log(scrollPosition)

  return (
    <Box sx={isHomePage ? { variant: 'nav' } : getNavStyle()}>
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
      {!isHomePage && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            transform: `translateY(${getTitlePosition()}px)`,
            width: 'auto',
            height: '58px',
            bg: 'transparent',
          }}
        >
          <Styled.h3 sx={{ m: 0, fontWeight: 700, fontSize: 4 }}>
            Saturday white bread
          </Styled.h3>
        </Box>
      )}
    </Box>
  )
}
