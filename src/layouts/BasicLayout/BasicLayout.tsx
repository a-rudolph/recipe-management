import { BG_PATH } from '@constants/assets'
import styled from 'styled-components'

type BasicLayoutProps = {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  background: url(${BG_PATH});
  background-size: cover;
  height: 100vh;
  width: 100vw;
`

export default function BasicLayout({ children }: BasicLayoutProps) {
  return <StyledDiv>{children}</StyledDiv>
}
