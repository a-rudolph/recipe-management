import { GetStaticPaths, GetStaticProps } from 'next'
import IngredientDisplay from '@components/IngredientDisplay'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import SimpleTimeline from '@components/SimpleTimeline'
import TimeDurations from '@components/TimeDurations'
import BasicLayout from '@layouts/BasicLayout'
import { Text } from '@components/atoms'

const RecipeDetail = ({ recipe }: { recipe: RecipeType }) => {
  const { name, start, bulk, proof, ingredients } = recipe

  return (
    <>
      <BasicLayout.Card side='right'>
        <Text.h1>{name}</Text.h1>
        <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        <TimeDurations bulk={bulk} proof={proof} />
        <IngredientDisplay ingredients={ingredients} />
      </BasicLayout.Card>
    </>
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

export default RecipeDetail
