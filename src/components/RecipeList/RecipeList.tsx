import { Row, Text } from '@components/atoms'
import SimpleTimeline from '@components/SimpleTimeline'
import styled from 'styled-components'
import Link from 'next/link'

const StyledDiv = styled.div`
  .dot {
    height: 8px;
    width: 8px;
    background: ${({ theme }) => theme.colors.wheaty_1};
    border-radius: 50%;
    margin: 0 16px;
  }
`

const StyledItem = styled.div`
  border-left: 6px solid ${({ theme }) => theme.colors.wheaty_4};
  padding: 16px 16px 0;
  margin: 16px 0;

  .divider {
    margin: 16px -16px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.mono_2};
  }

  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.wheaty_4}11;
  }
`

type RecipeListProps = {
  recipes: RecipeType[]
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  const samedayers: RecipeType[] = []
  const overnights: RecipeType[] = []

  recipes.forEach((recipe) => {
    switch (recipe.btf) {
      case 'samedayer':
        samedayers.push(recipe)
        break
      case 'overnight':
        overnights.push(recipe)
        break
    }
  })

  return (
    <StyledDiv>
      <Row>
        <Text.h2>Recipes</Text.h2>
      </Row>
      <Row className='centered'>
        <div className='dot' />
        <Text.h1>Same-day breads</Text.h1>
        <div className='dot' />
      </Row>
      <Row>
        <Text secondary weight={400} color='wheaty_2'>
          mix in the morning, bake in the afternoon
        </Text>
      </Row>
      {samedayers.map((recipe) => (
        <RecipeLink key={recipe.key} recipe={recipe} />
      ))}
      <Row className='centered'>
        <div className='dot' />
        <Text.h1>Overnight breads</Text.h1>
        <div className='dot' />
      </Row>
      <Row>
        <Text secondary weight={400} color='wheaty_2'>
          mix in the evening, bake in the morning
        </Text>
      </Row>
      {overnights.map((recipe) => (
        <RecipeLink key={recipe.key} recipe={recipe} />
      ))}
    </StyledDiv>
  )
}

const RecipeLink = ({ recipe }: { recipe: RecipeType }) => {
  const { name, start, bulk, proof, key } = recipe
  return (
    <Link key={key} href='/recipes/[key]' as={`/recipes/${key}`}>
      <StyledItem>
        <Text.h2>{name}</Text.h2>
        <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        <div className='divider' />
      </StyledItem>
    </Link>
  )
}

export default RecipeList
