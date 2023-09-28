import { Col, Row } from 'antd'
import breakpoints from '@/constants/breakpoints'
import dynamic from 'next/dynamic'
import SimpleTimeline from '@/components/SimpleTimeline'
import styled from 'styled-components'
import TimeDurations from '@/components/TimeDurations'

const IngredientDisplay = dynamic(
  () => import('@/components/IngredientDisplay'),
  {
    ssr: false,
  }
)

const StyledDiv = styled.div`
  padding: 0 24px;
  width: 100%;

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: 50%;
  }
`

const RecipeDetail = ({ recipe }: { recipe: RecipeType }) => {
  const { start, bulk, proof, ingredients } = recipe

  return (
    <StyledDiv>
      <Row justify='end' gutter={16} style={{ marginRight: '-12px' }}>
        <Col>
          <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        </Col>
        <Col>
          <TimeDurations bulk={bulk} proof={proof} />
        </Col>
      </Row>
      <IngredientDisplay ingredients={ingredients} />
    </StyledDiv>
  )
}

export default RecipeDetail
