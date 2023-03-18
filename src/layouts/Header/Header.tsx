import { BRAND_NAME } from '@/styles/themes'
import Link from 'next/link'
import LogoIcon from '@/components/icons/Logo'
import MenuDropdown from '@/components/MenuDropdown'
import { Row } from 'antd'
import styled from 'styled-components'
import { Text } from '@/components/atoms'

const StyledRow = styled(Row)`
  cursor: pointer;

  .logo {
    margin-right: 12px;
  }
`

export default function Header() {
  return (
    <MenuDropdown>
      <Link href='/' as='/'>
        <StyledRow align='middle'>
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
