import { Col, Row } from 'antd'
import breakpoints from '@constants/breakpoints'
import { CardTitle } from '@components/atoms'
import IngredientDisplay from '@components/IngredientDisplay'
import SimpleTimeline from '@components/SimpleTimeline'
import styled from 'styled-components'
import TimeDurations from '@components/TimeDurations'

const StyledDiv = styled.div`
  padding: 0 24px;
  width: 100%;

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: 50%;
  }
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
      <CardTitle>{name}</CardTitle>
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
