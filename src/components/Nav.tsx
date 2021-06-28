/** @jsx jsx */
import { jsx, Box, Flex, Text, Styled } from 'theme-ui'
import { useCallback, useState } from 'react'
import { BRAND_NAME } from '@styles/themes'
import ToggleColorModeButton from './ToggleColorModeButton'
import useScrollListener from '@hooks/useScrollListener'
import LogoIcon from '@components/icons/Logo'
import Link from 'next/link'

export const Nav = ({ title }: { title?: string }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  useScrollListener(setScrollPosition)

  const getNavStyle = useCallback(() => {
    return {
      variant: `nav.${scrollPosition < 25 ? 'primary' : 'secondary'}`,
      boxShadow: scrollPosition < 57 ? '0' : '0px 1px 2px 1px rgb(0,0,0,0.25)',
      '.logo-label': {
        display: scrollPosition < 25 ? 'block' : 'none',
      },
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
      transition: 'left .4s ease',
      left: [scrollPosition < 25 ? 1 : 5, 0],
    }
  }, [scrollPosition])

  const getTitleSize = useCallback(() => {
    return calcTransition(42, 32)
  }, [scrollPosition])
  return (
    <Box sx={title ? getNavStyle() : { variant: 'nav' }}>
      <Flex p={2} sx={{ alignItems: 'center', position: 'relative' }}>
        <Link href='/'>
          <Flex sx={{ cursor: 'pointer', zIndex: '51' }}>
            <LogoIcon />
            <Text
              className='logo-label'
              sx={{
                variant: 'nav.item',
                opacity: 1,
                color: 'wheaty',
                fontWeight: 500,
                fontSize: 3,
              }}
            >
              {BRAND_NAME}
            </Text>
          </Flex>
        </Link>
        <ToggleColorModeButton />
      </Flex>
      {title && (
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
          <Styled.h3
            sx={{
              m: 0,
              ml: [2, 5],
              color: 'text',
              fontWeight: 700,
              fontSize: [4, `${getTitleSize()}px`],
              transition: 'all .2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Styled.h3>
        </Box>
      )}
    </Box>
  )
}
