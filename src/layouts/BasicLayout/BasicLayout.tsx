import { BG_PATH, BG_SM_PATH } from '@constants/assets'
import { BRAND_NAME } from '@styles/themes'
import { Text } from '@components/atoms'
import breakpoints from '@constants/responsive'
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

const Logo = () => {
  return <Text>{BRAND_NAME}</Text>
}

export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <StyledDiv>
      <Logo />
      <div>{children}</div>
    </StyledDiv>
  )
}
