import { BRAND_NAME, getColor, getStyle } from '@styles/themes'
import { Text, Row } from '@components/atoms'
import LogoIcon from '@components/icons/Logo'
import styled from 'styled-components'
import Link from 'next/link'

const StyledRow = styled(Row)`
  cursor: pointer;

  .logo {
    margin-right: 12px;
  }
`

const StyledHeader = styled(Row)`
  background: ${({ theme }) => theme.gradient};
  border-bottom: 1px solid ${getColor('mono_2')};
  box-shadow: ${getStyle('shade', 'small')};
  padding: 4px 12px;
`

export default function Header() {
  return (
    <StyledHeader justify='space-between' align='center'>
      <StyledRow align='center'>
        <Link href='/'>
          <div className='logo'>
            <LogoIcon />
          </div>
        </Link>
        <Text fs='h4' weight={500}>
          {BRAND_NAME}
        </Text>
      </StyledRow>
    </StyledHeader>
  )
}
