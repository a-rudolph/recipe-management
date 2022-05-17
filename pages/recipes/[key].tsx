import { animated } from 'react-spring'
import { getColor } from '@styles/themes'
import { GetStaticPaths, GetStaticProps } from 'next'
import useDragScroller, {
  SCROLLER_ID,
  SCROLL_DURATION,
} from '@hooks/useDragScroller'
import DetailedTimeline from '@components/DetailedTimeline'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import RecipeDetail from '@components/RecipeDetail'
import BasicLayout from '@layouts/BasicLayout'
import breakpoints from '@constants/breakpoints'
import styled, { css } from 'styled-components'
import NavBar from '@layouts/NavBar'

const ScrollContainer = styled(animated.div)`
  width: 100vw;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    height: 2px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${getColor('wheaty_1')};
  }

  .pages {
    display: flex;
    width: 200vw;
  }

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: auto;

    .pages {
      width: auto;
    }
  }
`

const StyledNav = styled.div<{ $side: number }>`
  width: 100vw;
  height: 32px;

  .slider {
    height: 4px;
    width: 50vw;
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
          <StyledNav $side={side}>
            <div className='slider'></div>
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
