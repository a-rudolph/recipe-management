import { Button, Text } from '@components/atoms'
import { Col, Row } from 'antd'
import { GetStaticPaths, GetStaticProps } from 'next'
import styled, { css } from 'styled-components'
import useDragScroller, {
  SCROLL_DURATION,
  SCROLLER_ID,
} from '@hooks/useDragScroller'
import { animated } from 'react-spring'
import BasicLayout from '@layouts/BasicLayout'
import breakpoints from '@constants/breakpoints'
import DetailedTimeline from '@components/DetailedTimeline'
import getRecipePaths from '@utils/getRecipePaths'
import NavBar from '@layouts/NavBar'
import RecipeDetail from '@components/RecipeDetail'
import { recipes } from '@constants/recipes'

const ScrollContainer = styled(animated.div)`
  width: 100vw;
  overflow-x: scroll;
  padding: 24px 0;

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
  const { side, scroll, goTo } = useDragScroller({
    initialSlide: 0,
  })

  return (
    <BasicLayout.Card>
      <ScrollContainer scrollLeft={scroll.left} id={SCROLLER_ID}>
        <div className='pages'>
          <RecipeDetail recipe={recipe} />
          <DetailedTimeline recipe={recipe} />
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
                  <Text>Basics</Text>
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
  const recipe = recipes.find((recipe) => recipe.key === params?.key)
  return {
    props: { recipe },
  }
}

export default Page
