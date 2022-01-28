import { BRAND_NAME } from '@styles/themes'
import { Text, Row } from '@components/atoms'
import LogoIcon from '@components/icons/Logo'
import styled from 'styled-components'
import Link from 'next/link'

const StyledLogoWrap = styled.div`
  padding: 12px;
`

export default function Header() {
  return (
    <Row>
      <Link href='/'>
        <StyledLogoWrap>
          <LogoIcon />
        </StyledLogoWrap>
      </Link>
      <Text
        fs='24px'
        style={{ letterSpacing: '1px' }}
        weight={600}
        color='wheaty_1'
      >
        {BRAND_NAME}
      </Text>
    </Row>
  )
}
