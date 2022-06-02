import { CardTitle } from '@components/atoms'
import { Col, Row } from 'antd'
import { getTimelineSteps } from '@utils/timeline'
import breakpoints from '@constants/breakpoints'
import { getColor } from '@styles/themes'
import styled from 'styled-components'
import TimelineItem from '@components/TimelineItem'

const StyledDiv = styled.div`
  width: calc(100% - 48px);
  margin: 0 24px;

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: 50%;
  }

  .main-col {
    position: relative;

    .timeline-content {
      * {
        z-index: 1;
      }
    }

    .vert-line {
      position: absolute;
      right: 36px;
      top: 0px;
      height: calc(100% - 32px);
      width: 3px;
      margin: 6px;
      background: ${getColor('secondary_1')};
      pointer-events: none;
    }
  }
`

const DetailedTimeline = ({ recipe }: { recipe: RecipeType }) => {
  const steps = getTimelineSteps(recipe)

  return (
    <StyledDiv>
      <Row
        align='middle'
        style={{ marginBottom: '16px' }}
        justify='space-between'
      >
        <Col md={0}>
          <CardTitle>{recipe.name}</CardTitle>
        </Col>
      </Row>
      <div className='main-col'>
        <div className='vert-line' />
        <div className='timeline-content'>
          {steps.map((step, i) => (
            <TimelineItem key={i} showHelp={i === 0} step={step} />
          ))}
        </div>
      </div>
    </StyledDiv>
  )
}

export default DetailedTimeline
