import { BG_PATH, BG_SM_PATH } from '@constants/assets'
import breakpoints from '@constants/responsive'
import styled from 'styled-components'

type BasicLayoutProps = {
  children: React.ReactNode
}

const BG_1 = '#082032'

const StyledDiv = styled.div`
  height: 100vh;
  width: 100vw;

  background: url(${BG_SM_PATH});
  background-size: cover;
  background-color: ${BG_1};
  background-repeat: no-repeat;
  background-position-x: center;

  @media screen and (min-width: ${breakpoints.sm}px) {
    background: url(${BG_PATH});
    background-color: ${BG_1};
    background-size: cover;
    background-repeat: no-repeat;
  }
`

export default function BasicLayout({ children }: BasicLayoutProps) {
  return <StyledDiv>{children}</StyledDiv>
}
