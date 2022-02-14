import { BRAND_NAME, getColor, getStyle } from '@styles/themes'
import { Text, Row } from '@components/atoms'
import LogoIcon from '@components/icons/Logo'
import styled from 'styled-components'
import Link from 'next/link'

const StyledLogoWrap = styled.div`
  padding: 4px 12px;
  cursor: pointer;
`

const StyledHeader = styled(Row)`
  background-color: ${getColor('secondary_1')};
  border-bottom: 1px solid ${getColor('mono_2')};
  box-shadow: ${getStyle('shade', 'small')};
`

export default function Header() {
  return (
    <StyledHeader align='center'>
      <Link href='/'>
        <StyledLogoWrap>
          <LogoIcon />
        </StyledLogoWrap>
      </Link>
      <Text fs='24px' weight={500}>
        {BRAND_NAME}
      </Text>
    </StyledHeader>
  )
}
