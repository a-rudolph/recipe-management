import { Text } from '@components/atoms'
import SimpleTimeline from '@components/SimpleTimeline'
import Link from 'next/link'
import styled from 'styled-components'

const StyledDiv = styled.div``

const StyledItem = styled.div`
  .divider {
    margin: 16px -16px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.mono_2};
  }
`

type RecipeListProps = {
  recipes: RecipeType[]
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <StyledDiv>
      {recipes.map(({ name, start, bulk, proof, key }) => (
        <Link key={key} href='/recipes/[key]' as={`/recipes/${key}`}>
          <StyledItem>
            <Text weight={500} fs='24px' color='wheaty_1'>
              {name}
            </Text>
            <SimpleTimeline start={start} bulk={bulk} proof={proof} />
            <div className='divider' />
          </StyledItem>
        </Link>
      ))}
    </StyledDiv>
  )
}
