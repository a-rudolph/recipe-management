import { animated } from 'react-spring'
import { getColor } from '@styles/themes'
import { GetStaticPaths, GetStaticProps } from 'next'
import useDragScroller, { SCROLLER_ID } from '@hooks/useDragScroller'
import DetailedTimeline from '@components/DetailedTimeline'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import RecipeDetail from '@components/RecipeDetail'
import BasicLayout from '@layouts/BasicLayout'
import breakpoints from '@constants/breakpoints'
import styled from 'styled-components'

type Views = 'main' | 'time'

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

const Page = ({ recipe }: { recipe: RecipeType }) => {
  const { scroll, goTo } = useDragScroller()

  return (
    <BasicLayout.Card side='right'>
      <ScrollContainer scrollLeft={scroll.left} id={SCROLLER_ID}>
        <div className='pages'>
          <RecipeDetail recipe={recipe} onClock={() => goTo(1)} />
          <DetailedTimeline recipe={recipe} onBack={() => goTo(0)} />
        </div>
      </ScrollContainer>
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
