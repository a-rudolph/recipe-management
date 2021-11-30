import { Card, Text } from '@components/atoms'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .atom-card {
    width: 80vw;
    height: 60vh;
  }
`

type HomeProps = {
  recipes: RecipeType[]
}

export default function Home({ recipes }: HomeProps) {
  return (
    <StyledDiv>
      <Card side='right'>
        <Text weight={500} fs='24px' color='wheaty_1'>
          Saturday white bread
        </Text>
      </Card>
    </StyledDiv>
  )
}

export const getStaticProps = async () => {
  const recipes = getAvailableRecipes()

  return {
    props: {
      recipes,
    },
  }
}
