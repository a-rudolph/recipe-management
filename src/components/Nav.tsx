/** @jsx jsx */
import { jsx, Button, Box, Flex, Text, Styled } from 'theme-ui'
import { useCallback, useState } from 'react'
import { BRAND_NAME } from '../themes'
import { useRouter } from 'next/router'
import useScrollListener from '../hooks/useScrollListener'
import Link from 'next/link'

export const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { pathname } = useRouter()
  const isHomePage = pathname === '/'
  useScrollListener(setScrollPosition)

  const getNavStyle = useCallback(() => {
    return {
      variant: `nav.${scrollPosition < 25 ? 'primary' : 'secondary'}`,
      boxShadow: scrollPosition < 57 ? '0' : '0px 1px 2px 1px rgb(0,0,0,0.25)',
    }
  }, [scrollPosition])

  const calcTransition = (start: number, finish: number): number => {
    const inc = (start - finish) / 57
    const calculated = start - inc * scrollPosition
    if (calculated < finish) return finish
    return calculated
  }

  const getTitlePosition = useCallback(() => {
    const getY = () => {
      const calculated = 72 - scrollPosition
      if (calculated < 15) return 15
      return calculated
    }
    const getX = () => {
      const calculated = 72 - scrollPosition
      if (calculated < 15) return 15
      return calculated
    }

    return {
      transform: `translate(${calcTransition(0, 24)}px, ${calcTransition(
        72,
        15
      )}px)`,
      // top: `${calcTransition(72, 15)}px`,
      // left: `${calcTransition(0, 24)}px`,
    }
  }, [scrollPosition])

  const getTitleSize = useCallback(() => {
    const start = 48
    const finish = 32
    const inc = (start - finish) / 57
    const calculated = start - inc * scrollPosition
    if (calculated < finish) return finish
    return calculated
  }, [scrollPosition])

  return (
    <Box sx={isHomePage ? { variant: 'nav' } : getNavStyle()}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text sx={{ variant: 'nav.item', opacity: 0 }}>{BRAND_NAME}</Text>
        <Link href='/'>
          <Button
            as='button'
            sx={{
              variant: `button.primary`,
            }}
          >
            Back
          </Button>
        </Link>
      </Flex>
      {!isHomePage && (
        <Box
          sx={{
            ...getTitlePosition(),
            position: 'fixed',
            top: 0,
            // transform: `translateY(${getTitlePosition()}px)`,
            width: 'auto',
            height: '58px',
            bg: 'transparent',
          }}
        >
          <Styled.h3
            sx={{ m: 0, fontWeight: 700, fontSize: [4, `${getTitleSize()}px`] }}
          >
            Saturday white bread
          </Styled.h3>
        </Box>
      )}
    </Box>
  )
}
56 - 32
14
