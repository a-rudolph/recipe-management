import { GetStaticPaths, GetStaticProps } from 'next'
import { animated, useSpring } from 'react-spring'
import IngredientDisplay from '@components/IngredientDisplay'
import DetailedTimeline from '@components/DetailedTimeline'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import SimpleTimeline from '@components/SimpleTimeline'
import TimeDurations from '@components/TimeDurations'
import BasicLayout from '@layouts/BasicLayout'
import { Text } from '@components/atoms'
import { useState } from 'react'

const RecipeDetail = ({
  recipe,
  onClock,
}: {
  recipe: RecipeType
  onClock: VoidFunction
}) => {
  const { name, start, bulk, proof, ingredients } = recipe

  return (
    <>
      <Text.h1>{name}</Text.h1>
      <SimpleTimeline start={start} bulk={bulk} proof={proof} />
      <TimeDurations onClock={onClock} bulk={bulk} proof={proof} />
      <IngredientDisplay ingredients={ingredients} />
    </>
  )
}

type Views = 'main' | 'time'

const Page = ({ recipe }: { recipe: RecipeType }) => {
  const animateProps = useSpring({
    to: { transform: 'translateX(0)', opacity: 1 },
    from: { transform: 'translateX(100%)', opacity: 0.5 },
  })

  const [view, setView] = useState<Views>('main')

  const changeView = () => {
    setView((prev) => {
      if (prev === 'main') return 'time'
      return 'main'
    })
  }

  return (
    <animated.div style={animateProps}>
      <BasicLayout.Card side='right'>
        {view === 'main' && (
          <RecipeDetail recipe={recipe} onClock={changeView} />
        )}
        {view === 'time' && (
          <DetailedTimeline recipe={recipe} onBack={changeView} />
        )}
      </BasicLayout.Card>
    </animated.div>
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
