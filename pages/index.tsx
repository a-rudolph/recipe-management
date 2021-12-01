import { Card, Text } from '@components/atoms'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import SimpleTimeline from '@components/SimpleTimeline'
import styled from 'styled-components'
import Link from 'next/link'

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

const StyledItem = styled.div`
  .divider {
    margin: 16px -16px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.mono_2};
  }
`

export default function Home({ recipes }: HomeProps) {
  return (
    <StyledDiv>
      <Card side='right'>
        {recipes.map(({ name, start, bulk, proof, key }, i) => (
          <StyledItem key={key}>
            <Link href='/recipes/[key]' as={`/recipes/${key}`}>
              <Text weight={500} fs='24px' color='wheaty_1'>
                {name}
              </Text>
            </Link>
            <SimpleTimeline start={start} bulk={bulk} proof={proof} />
            {i + 1 === recipes.length || <div className='divider' />}
          </StyledItem>
        ))}
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
