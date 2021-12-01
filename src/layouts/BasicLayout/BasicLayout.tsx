import { BG_PATH, BG_SM_PATH } from '@constants/assets'
import { Row } from '@components/atoms'
import breakpoints from '@constants/responsive'
import TimeCard from '@components/TimeCard'
import styled from 'styled-components'
import Header from '@layouts/Header'

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

  .page-content {
    margin-top: 24px;
  }
`

export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <StyledDiv>
      <Header />
      <Row className='centered'>
        <TimeCard />
      </Row>
      <div className='page-content'>{children}</div>
    </StyledDiv>
  )
}
