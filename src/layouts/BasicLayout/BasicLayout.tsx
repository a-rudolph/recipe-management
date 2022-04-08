import { getColor } from '@styles/themes'
import breakpoints from '@constants/breakpoints'
import styled from 'styled-components'
import Header from '@layouts/Header'
import Card from '@components/atoms/Card'

type BasicLayoutProps = {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  min-height: 100vh;
  width: 100vw;

  background-color: ${getColor('primary_1')};

  .page-content {
    margin-top: 24px;

    display: flex;
    justify-content: flex-end;

    @media screen and (min-width: ${breakpoints.sm}px) {
      justify-content: space-around;
    }
  }
`

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <StyledDiv>
      <Header />
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

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: 320px;
    border-radius: 4px;
  }
`

BasicLayout.Card = LayoutCard

export default BasicLayout
