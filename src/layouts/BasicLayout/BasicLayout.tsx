import { BG_PATH, BG_SM_PATH } from '@constants/assets'
// import { Row } from '@components/atoms'
import breakpoints from '@constants/responsive'
import responsive from '@constants/responsive'
// import dynamic from 'next/dynamic'
import styled from 'styled-components'
import Header from '@layouts/Header'
import Card from '@components/atoms/Card/Card'

type BasicLayoutProps = {
  children: React.ReactNode
}

// const TimerCard = dynamic(() => import('@components/TimerCard'), {
//   ssr: false,
// })

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

    display: flex;
    justify-content: flex-end;

    @media screen and (min-width: ${responsive.sm}px) {
      justify-content: space-around;
    }
  }
`

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <StyledDiv>
      <Header />
      {/* <Row className='centered'>
        <TimerCard />
      </Row> */}
      <div className='page-content'>{children}</div>
    </StyledDiv>
  )
}

const LayoutCard = styled(Card)`
  width: 80vw;
  min-height: 60vh;
  margin-bottom: 24px;
  padding: 24px;
  overflow: hidden;

  @media screen and (min-width: ${responsive.sm}px) {
    width: 320px;
    border-radius: 4px;
  }
`

BasicLayout.Card = LayoutCard

export default BasicLayout
