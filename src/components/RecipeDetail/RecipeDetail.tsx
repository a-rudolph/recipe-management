import IngredientDisplay from '@components/IngredientDisplay'
import { Col, Row } from 'antd'
import SimpleTimeline from '@components/SimpleTimeline'
import styled from 'styled-components'
import { Text } from '@components/atoms'
import TimeDurations from '@components/TimeDurations'

const StyledDiv = styled.div`
  padding: 0 24px;
  width: 100%;
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
      <Row align='middle' justify='end'>
        <Text
          fs='h3'
          style={{ margin: 0, textAlign: 'right', maxWidth: '280px' }}
        >
          {name}
        </Text>
      </Row>
      <Row justify='end' gutter={16}>
        <Col>
          <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        </Col>
        <Col>
          <TimeDurations onClock={onClock} bulk={bulk} proof={proof} />
        </Col>
      </Row>
      <IngredientDisplay ingredients={ingredients} />
    </StyledDiv>
  )
}

export default RecipeDetail
