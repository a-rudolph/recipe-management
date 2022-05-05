import IngredientDisplay from '@components/IngredientDisplay'
import SimpleTimeline from '@components/SimpleTimeline'
import TimeDurations from '@components/TimeDurations'
import { Text, Row } from '@components/atoms'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 0 24px;
`

const RecipeDetail = ({
  recipe,
  onClock,
}: {
  recipe: RecipeType
  onClock: VoidFunction
}) => {
  const { name, start, bulk, proof, ingredients } = recipe

  return (
    <StyledDiv>
      <Row align='start' justify='end'>
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
    </StyledDiv>
  )
}

export default RecipeDetail
