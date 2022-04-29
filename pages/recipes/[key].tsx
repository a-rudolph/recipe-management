import { GetStaticPaths, GetStaticProps } from 'next'
import IngredientDisplay from '@components/IngredientDisplay'
import DetailedTimeline from '@components/DetailedTimeline'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import SimpleTimeline from '@components/SimpleTimeline'
import TimeDurations from '@components/TimeDurations'
import BasicLayout from '@layouts/BasicLayout'
import BackButton from '@components/BackButton'
import { useRouter } from 'next/router'
import { Text, Row } from '@components/atoms'
import { useState } from 'react'

const RecipeDetail = ({
  recipe,
  onClock,
}: {
  recipe: RecipeType
  onClock: VoidFunction
}) => {
  const { name, start, bulk, proof, ingredients } = recipe
  const router = useRouter()

  const onBack = () => {
    router.push('/')
  }

  return (
    <>
      <Row align='start' justify='space-between'>
        <BackButton onBack={onBack}>recipes</BackButton>
        <Text
          fs='h3'
          style={{ margin: 0, textAlign: 'right', maxWidth: '280px' }}
        >
          {name}
        </Text>
      </Row>
      <SimpleTimeline start={start} bulk={bulk} proof={proof} />
      <TimeDurations onClock={onClock} bulk={bulk} proof={proof} />
      <IngredientDisplay ingredients={ingredients} />
    </>
  )
}

type Views = 'main' | 'time'

const Page = ({ recipe }: { recipe: RecipeType }) => {
  const [view, setView] = useState<Views>('main')

  const changeView = () => {
    setView((prev) => {
      if (prev === 'main') return 'time'
      return 'main'
    })
  }

  return (
    <BasicLayout.Card side='right'>
      {view === 'main' && <RecipeDetail recipe={recipe} onClock={changeView} />}
      {view === 'time' && (
        <DetailedTimeline recipe={recipe} onBack={changeView} />
      )}
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
