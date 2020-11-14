/** @jsx jsx */
import { jsx, Button, Box, Flex, Text, Styled } from 'theme-ui'
import { useCallback, useState } from 'react'
import { BRAND_NAME } from '../themes'
import { useRouter } from 'next/router'
import useScrollListener from '../hooks/useScrollListener'
import Link from 'next/link'

export const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { pathname, back } = useRouter()
  const isHomePage = pathname === '/'
  const isSchedulePage = pathname.includes('schedule')
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
    return {
      transform: `translateY(${calcTransition(72, 15)}px)`,
    }
  }, [scrollPosition])

  const getTitleSize = useCallback(() => {
    return calcTransition(48, 32)
  }, [scrollPosition])

  return (
    <Box sx={isHomePage ? { variant: 'nav' } : getNavStyle()}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text sx={{ variant: 'nav.item', opacity: 0 }}>{BRAND_NAME}</Text>
        <Button
          onClick={back}
          as='button'
          sx={{
            variant: `button.primary`,
          }}
        >
          Back
        </Button>
      </Flex>
      {!isHomePage && (
        <Box
          sx={{
            ...getTitlePosition(),
            position: 'fixed',
            top: 0,
            width: 'auto',
            height: '58px',
            bg: 'transparent',
            display: 'flex',
          }}
        >
          {isSchedulePage && (
            <Link href={'/saturday-white-bread'}>
              <Text
                pl={2}
                pr={2}
                sx={{ fontWeight: 600, fontSize: 3 }}
              >{`<`}</Text>
            </Link>
          )}
          <Styled.h3
            sx={{
              ml: [0, 5],
              m: 0,
              color: 'primary',
              fontWeight: 700,
              fontSize: [4, `${getTitleSize()}px`],
            }}
          >
            Saturday white bread
          </Styled.h3>
        </Box>
      )}
    </Box>
  )
}
