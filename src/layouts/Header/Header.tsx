import { Text, Row } from '@components/atoms'
import { BRAND_NAME } from '@styles/themes'
import Link from 'next/link'
import LogoIcon from '@components/icons/Logo'
import MenuDropdown from '@components/MenuDropdown'
import styled from 'styled-components'

const StyledRow = styled(Row)`
  cursor: pointer;

  .logo {
    margin-right: 12px;
  }
`

export default function Header() {
  return (
    <MenuDropdown>
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
    </MenuDropdown>
  )
}
