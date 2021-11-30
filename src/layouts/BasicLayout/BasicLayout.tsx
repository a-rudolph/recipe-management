import { BG_PATH, BG_SM_PATH } from '@constants/assets'
import { BRAND_NAME } from '@styles/themes'
import { Text } from '@components/atoms'
import breakpoints from '@constants/responsive'
import LogoIcon from '@components/icons/Logo'
import styled from 'styled-components'

type BasicLayoutProps = {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  height: 100vh;
  width: 100vw;

  background-image: url(${BG_SM_PATH});
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.bg_1};
  background-repeat: no-repeat;
  background-position-x: center;

  @media screen and (min-width: ${breakpoints.sm}px) {
    background-image: url(${BG_PATH});
    background-position-x: unset;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;

  .header-logo-wrap {
    padding: 12px;
  }
`

const Header = () => {
  return (
    <Row>
      <div className='header-logo-wrap'>
        <LogoIcon />
      </div>
      <Text fs='24px' weight={500} color='#F6BB63'>
        {BRAND_NAME}
      </Text>
    </Row>
  )
}

export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <StyledDiv>
      <Header />
      <div>{children}</div>
    </StyledDiv>
  )
}
