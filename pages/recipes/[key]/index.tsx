import { GetStaticPaths, GetStaticProps } from 'next'
import { Card, Text } from '@components/atoms'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import SimpleTimeline from '@components/SimpleTimeline'
import styled from 'styled-components'

const StyledItem = styled.div`
  .divider {
    margin: 16px -16px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.mono_2};
  }
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .atom-card {
    width: 80vw;
    height: 60vh;
  }
`

export default function RecipeDetail({ recipe }: { recipe: RecipeType }) {
  const { name, start, bulk, proof, key } = recipe

  return (
    <StyledDiv>
      <Card side='right'>
        <StyledItem key={key}>
          <Text weight={500} fs='24px' color='wheaty_1'>
            {name}
          </Text>
          <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        </StyledItem>
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
