import { BG_PATH, BG_SM_PATH } from '@constants/assets'
import breakpoints from '@constants/responsive'
import styled from 'styled-components'
import Header from '@layouts/Header'

type BasicLayoutProps = {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  min-height: 100vh;
  width: 100vw;

  background-image: url(${BG_SM_PATH});
  background-size: 100vw auto;
  background-color: ${({ theme }) => theme.colors.bg_1};
  background-repeat: no-repeat;
  background-position-x: center;

  @media screen and (min-width: ${breakpoints.sm}px) {
    background-image: url(${BG_PATH});
    background-position-x: unset;
  }

  .page-content {
    margin-top: 16px;
  }
`

export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <StyledDiv>
      <Header />
      <div className='page-content'>{children}</div>
    </StyledDiv>
  )
}
