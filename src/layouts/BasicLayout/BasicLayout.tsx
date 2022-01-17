import { BG_PATH, BG_SM_PATH } from '@constants/assets'
import { Row } from '@components/atoms'
import breakpoints from '@constants/responsive'
import SoundToggle from '@components/SoundToggle'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import Header from '@layouts/Header'

type BasicLayoutProps = {
  children: React.ReactNode
}

const TimerCard = dynamic(() => import('@components/TimerCard'), {
  ssr: false,
})

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
    margin-top: 24px;
  }

  .sound-btn {
    position: absolute;
    top: 0;
    right: 0;

    padding: 23px 16px;
  }
`

export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <StyledDiv>
      <Header />
      <SoundToggle />
      <Row className='centered'>
        <TimerCard />
      </Row>
      <div className='page-content'>{children}</div>
    </StyledDiv>
  )
}
