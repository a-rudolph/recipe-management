import { BRAND_NAME, getColor, getStyle } from '@styles/themes'
import { Text, Row, Button } from '@components/atoms'
import LogoIcon from '@components/icons/Logo'
import styled from 'styled-components'
import Link from 'next/link'
import breakpoints from '@constants/breakpoints'

const StyledRow = styled(Row)`
  background: ${({ theme }) => theme.gradient};
  width: 100%;
  height: 100%;
  padding: 8px 12px;

  cursor: pointer;

  .atom-button {
    padding: 0;
    height: 48px;
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

  @media screen and (min-width: ${breakpoints.sm}px) {
    display: none;
  }
`

export default function NavBar() {
  return (
    <StyledNavBar>
      <StyledRow justify='space-between' align='center'>
        <Link href='/'>
          <Button type='ghost'>
            <LogoIcon />
          </Button>
        </Link>
        <Text fs='h4' color='wheaty_1' weight={500}>
          {BRAND_NAME}
        </Text>
      </StyledRow>
    </StyledNavBar>
  )
}
