import { getColor, getStyle } from '@styles/themes'
import { Text, Row, Button } from '@components/atoms'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import breakpoints from '@constants/breakpoints'
import LeftArrow from '@components/icons/LeftArrow'
import _isArray from 'lodash/isArray'

const StyledRow = styled(Row)`
  background: ${({ theme }) => theme.gradient};
  width: 100%;
  height: 100%;
  padding: 8px 12px;

  .atom-button {
    padding: 0;
    height: 32px;
  }

  .logo {
    margin-right: 12px;
  }
`

const StyledNavBar = styled(Row)`
  width: 100vw;
  background-color: ${getColor('primary_1')};
  border-top: 1px solid ${getColor('mono_2')};
  box-shadow: ${getStyle('shade', 'up')};
  position: fixed;
  bottom: 0;
  z-index: 10;

  @media screen and (min-width: ${breakpoints.sm}px) {
    display: none;
  }
`

const getTitle = (key?: string | string[]) => {
  if (!key) return 'recipes'

  if (_isArray(key)) return key

  return (key as string).replace(/-/g, ' ')
}

export default function NavBar() {
  const router = useRouter()

  const title = getTitle(router?.query?.key)
  const isHome = router.pathname === '/'

  return (
    <StyledNavBar>
      <StyledRow justify='space-between' align='center'>
        <span>
          {isHome || (
            <Link href='/'>
              <Button type='ghost'>
                <LeftArrow size={32} />
              </Button>
            </Link>
          )}
        </span>
        <Text fs='h4' color='wheaty_1' weight={500}>
          {title}
        </Text>
      </StyledRow>
    </StyledNavBar>
  )
}