import { GetStaticPaths, GetStaticProps } from 'next'
import IngredientDisplay from '@components/IngredientDisplay'
import { Card, Text } from '@components/atoms'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import SimpleTimeline from '@components/SimpleTimeline'
import TimeDurations from '@components/TimeDurations'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .atom-card {
    width: 80vw;
    min-height: 60vh;
    padding: 24px;
    margin-bottom: 24px;
  }
`

export default function RecipeDetail({ recipe }: { recipe: RecipeType }) {
  const { name, start, bulk, proof, ingredients } = recipe

  return (
    <StyledDiv>
      <Card side='right'>
        <Text weight={500} fs='32px' color='wheaty_1'>
          {name}
        </Text>
        <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        <TimeDurations bulk={bulk} proof={proof} />
        <IngredientDisplay ingredients={ingredients} />
      </Card>
    </StyledDiv>
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