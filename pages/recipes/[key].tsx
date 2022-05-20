import { Button, Text } from '@components/atoms'
import { Col, Row } from 'antd'
import { GetStaticPaths, GetStaticProps } from 'next'
import styled, { css } from 'styled-components'
import useDragScroller, {
  SCROLLER_ID,
  SCROLL_DURATION,
} from '@hooks/useDragScroller'
import { animated } from 'react-spring'
import BasicLayout from '@layouts/BasicLayout'
import DetailedTimeline from '@components/DetailedTimeline'
import breakpoints from '@constants/breakpoints'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import NavBar from '@layouts/NavBar'
import RecipeDetail from '@components/RecipeDetail'

const ScrollContainer = styled(animated.div)`
  width: 100vw;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 0px;
  }

  .pages {
    display: flex;
    width: 200vw;
  }

  .scroll-column {
    height: 100vw;
  }

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: auto;

    .pages {
      width: auto;
    }
  }
`

const StyledNav = styled.div<{ $side: number; $count: number }>`
  width: 100vw;
  height: 32px;

  .slider {
    height: 4px;
    width: ${({ $count }) => 100 / $count}vw;
    position: absolute;
    top: 0;

    transition: all ${SCROLL_DURATION / 1_000}s;

    ${({ $side }) => {
      if ($side === 0) {
        return css`
          left: 0;
        `
      }

      return css`
        left: 50vw;
      `
    }}
    background: ${({ theme }) => theme.colors.wheaty_1};
  }
`

const Page = ({ recipe }: { recipe: RecipeType }) => {
  const { side, scroll, goTo } = useDragScroller()

  return (
    <BasicLayout.Card side='right'>
      <ScrollContainer scrollLeft={scroll.left} id={SCROLLER_ID}>
        <div className='pages'>
          <RecipeDetail recipe={recipe} onClock={() => goTo(1)} />
          <DetailedTimeline recipe={recipe} onBack={() => goTo(0)} />
        </div>
      </ScrollContainer>
      <NavBar
        tabs={
          <StyledNav $count={2} $side={side}>
            <div className='slider'></div>
            <Row
              justify='space-between'
              align='middle'
              style={{ height: '100%' }}
            >
              <Col span={12}>
                <Button block={true} onClick={() => goTo(0)} type='ghost'>
                  <Text>Detail</Text>
                </Button>
              </Col>
              <Col span={12}>
                <Button block={true} type='ghost' onClick={() => goTo(1)}>
                  <Text>Schedule</Text>
                </Button>
              </Col>
            </Row>
          </StyledNav>
        }
      />
    </BasicLayout.Card>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    ...getRecipePaths(),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    ...getRecipeProps(params),
  }
}

export default Page
