import { getColor } from '@styles/themes'
import breakpoints from '@constants/breakpoints'
import styled from 'styled-components'
import Header from '@layouts/Header'
import Card from '@components/atoms/Card'
import dynamic from 'next/dynamic'
import NavBar from '@layouts/NavBar'

type BasicLayoutProps = {
  children: React.ReactNode
}

const TimerCard = dynamic(() => import('@components/TimerCard'))

const StyledDiv = styled.div`
  min-height: 100vh;
  width: 100vw;

  @media screen and (min-width: ${breakpoints.sm}px) {
    padding-bottom: 60px;
  }

  background-color: ${getColor('primary_1')};

  font-size: 100%; /*16px*/

  font-family: ${({ theme }) => {
    return theme.font
  }};

  font-weight: 400;
  line-height: 1.5;
  color: ${getColor('text_1')};

  p {
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 3rem 0 1.38rem;
    font-family: ${({ theme }) => theme.font};
    font-weight: 400;
    line-height: 1.3;
  }

  h1 {
    margin-top: 0;
  }

  .page-content {
    display: flex;
    justify-content: flex-end;

    @media screen and (min-width: ${breakpoints.sm}px) {
      justify-content: space-around;
    }
  }

  .timer-content {
    margin: 16px;
    display: flex;
    justify-content: center;
  }
`

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const timerEnabled = false

  return (
    <StyledDiv>
      <Header />
      {timerEnabled && (
        <div className='timer-content'>
          <TimerCard />
        </div>
      )}
      <div className='page-content'>{children}</div>
      {/* <NavBar /> */}
    </StyledDiv>
  )
}

const LayoutCard = styled(Card)`
  width: 100vw;
  min-height: 60vh;
  padding: 0;
  padding-bottom: 64px;
  overflow: hidden;
  border-radius: 0;

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: max-content;
    padding-bottom: 24px;
    border-radius: 4px;
  }
`

BasicLayout.Card = LayoutCard

export default BasicLayout
