import { BRAND_NAME, getColor, getStyle } from '@styles/themes'
import { Text, Row } from '@components/atoms'
import LogoIcon from '@components/icons/Logo'
import styled from 'styled-components'
import Link from 'next/link'
import breakpoints from '@constants/breakpoints'

const StyledRow = styled(Row)`
  cursor: pointer;

  .logo {
    margin-right: 12px;
  }
`

const StyledHeader = styled(Row)`
  padding: 4px 12px;

  @media screen and (min-width: ${breakpoints.sm}px) {
    background: ${({ theme }) => theme.gradient};
    border-bottom: 1px solid ${getColor('mono_2')};
    box-shadow: ${getStyle('shade', 'small')};
  }
`

export default function Header() {
  return (
    <StyledHeader justify='space-between' align='center'>
      <Link href='/'>
        <StyledRow align='center'>
          <div className='logo'>
            <LogoIcon />
          </div>
          <Text fs='h4' color='wheaty_1' weight={500}>
            {BRAND_NAME}
          </Text>
        </StyledRow>
      </Link>
    </StyledHeader>
  )
}
