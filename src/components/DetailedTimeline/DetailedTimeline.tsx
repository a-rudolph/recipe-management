import { Col, Row } from 'antd'
import {
  getTimelineSteps,
  hoursToTimeString,
  hoursToDuration,
} from '@utils/timeline'
import BackButton from '@components/BackButton'
import breakpoints from '@constants/breakpoints'
import { clamp } from '@utils/clamp'
import { getColor } from '@styles/themes'
import styled from 'styled-components'
import { Text } from '@components/atoms'

const StyledDiv = styled.div`
  width: calc(100% - 48px);
  margin: 0 24px;

  .main-col {
    position: relative;

    .timeline-content {
      * {
        z-index: 1;
      }
    }

    .vert-line {
      position: absolute;
      right: 32px;
      top: 0px;
      height: calc(100% - 16px);
      width: 3px;
      margin: 6px;
      background: ${getColor('secondary_1')};
      transform-origin: top;
    }
  }

  .main-row {
    border-bottom: 1px solid ${getColor('wheaty_4')};
    margin-right: 16px;
    margin-bottom: 16px;
  }

  .break-row {
    justify-content: end;
    align-items: center;
    padding-right: 24px;
    margin: 8px 0;
  }

  .dot {
    height: 4px;
    width: 4px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${getColor('secondary_1')};
    background: ${getColor('wheaty_1')};
  }

  .time-oval {
    margin-bottom: -4px;
    margin-right: -18px;
    padding: 2px 16px;
    border-radius: 60px;
    background: ${getColor('secondary_1')};
  }

  @media screen and (min-width: ${breakpoints.md}px) {
    min-width: 360px;
  }
`

const DetailedTimeline = ({
  recipe,
  onBack,
}: {
  recipe: RecipeType
  onBack?: VoidFunction
}) => {
  const steps = getTimelineSteps(recipe)

  return (
    <StyledDiv>
      <Row justify='space-between'>
        <Col md={0}>
          <BackButton onBack={onBack}>{recipe.name.toLowerCase()}</BackButton>
        </Col>
        <Col xs={0} md={1} />
        <Col>
          <Text fs='h4' style={{ marginBottom: '16px' }}>
            Schedule
          </Text>
        </Col>
      </Row>
      <div className='main-col'>
        <div className='vert-line' />
        <div className='timeline-content'>
          {steps.map((step, i) => (
            <div key={i}>
              <Row className='main-row' justify='space-between' align='middle'>
                <Text fs='h4' weight={600} color='text_1'>
                  {step.title}
                </Text>
                <div className='time-oval'>
                  <Text fs='h5'>{hoursToTimeString(step.time)}</Text>
                </div>
              </Row>
              {step.break && (
                <Row
                  className='break-row'
                  style={{ height: `${clamp(0.5, step.duration, 2) * 3}rem` }}
                >
                  <Text secondary>{step.break}</Text>
                  <Text style={{ margin: '0 4px' }} secondary color='wheaty_1'>
                    {hoursToDuration(step.duration)}
                  </Text>
                  <div className='dot' />
                </Row>
              )}
            </div>
          ))}
        </div>
      </div>
    </StyledDiv>
  )
}

export default DetailedTimeline
