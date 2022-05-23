import { useSpring, animated } from 'react-spring'
import { CardTitle, Text } from '@components/atoms'
import { Col, Row, Switch } from 'antd'
import {
  getTimelineSteps,
  hoursToTimeString,
  hoursToDuration,
} from '@utils/timeline'
import breakpoints from '@constants/breakpoints'
import { clamp } from '@utils/clamp'
import { getColor } from '@styles/themes'
import styled from 'styled-components'
import { useState } from 'react'

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
      transform-origin: top;
    }
  }

  .main-row {
    border-bottom: 1px solid ${getColor('wheaty_4')};
    margin-right: 16px;
    margin-bottom: 16px;
  }

  .subTitle-row {
    justify-content: end;
    align-items: center;
    padding-right: 28px;
    margin: 8px 0;
  }

  .dot {
    height: 15px;
    width: 15px;
    margin: 8px;
    border-radius: 50%;
    border: 5px solid ${getColor('secondary_1')};
    background: ${getColor('wheaty_1')};
  }

  .time-oval {
    margin-bottom: -4px;
    margin-right: -18px;
    padding: 2px 16px;
    border-radius: 60px;
    background: ${getColor('secondary_1')};
  }

  .description,
  .post-text,
  .pre-text {
    height: min-content;
    width: calc(100% - 64px);
    text-align: justify;
  }

  .ant-switch-checked {
    background-color: #ac874e;
  }
`

const DetailedTimeline = ({ recipe }: { recipe: RecipeType }) => {
  const steps = getTimelineSteps(recipe)
  const [isShortView, setShortView] = useState(true)

  const style = useSpring({
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: !isShortView ? 1 : 0,
    x: !isShortView ? 0 : 20,
    maxHeight: !isShortView ? 110 : 0,
    from: { opacity: 0, x: 20, maxHeight: 0 },
  })

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
        <Col xs={0} md={1} />
        <Col>
          <label>
            <Row gutter={8}>
              <Col>
                <Switch
                  size='small'
                  checked={!isShortView}
                  onChange={(checked) => setShortView(!checked)}
                />
              </Col>
              <Col>show details</Col>
            </Row>
          </label>
        </Col>
      </Row>
      <div className='main-col'>
        <div className='vert-line' />
        <div className='timeline-content'>
          {steps.map(
            (
              {
                description = () => null,
                postDescription,
                preDescription,
                ...step
              },
              i
            ) => (
              <div key={i}>
                {preDescription && (
                  <animated.div style={style}>
                    <Row className='pre-text' style={{ marginBottom: '1rem' }}>
                      <Text>{preDescription(recipe)}</Text>
                    </Row>
                  </animated.div>
                )}
                <Row
                  className='main-row'
                  justify='space-between'
                  align='middle'
                >
                  <Text fs='h4' weight={600} color='text_1'>
                    {step.title}
                  </Text>
                  <div className='time-oval'>
                    <Text fs='h5'>{hoursToTimeString(step.time)}</Text>
                  </div>
                </Row>
                <animated.div style={style}>
                  <Row className='description'>
                    <Text>{description(recipe)}</Text>
                  </Row>
                </animated.div>
                {step.subTitle && (
                  <Row
                    className='subTitle-row'
                    style={{ height: `${clamp(0.5, step.duration, 1) * 3}rem` }}
                  >
                    <Text secondary>{step.subTitle}</Text>
                    <Text
                      style={{ margin: '0 4px' }}
                      secondary
                      color='wheaty_1'
                    >
                      {hoursToDuration(step.duration)}
                    </Text>
                    <div className='dot' />
                  </Row>
                )}
                {postDescription && (
                  <animated.div style={style}>
                    <Row className='post-text' style={{ marginBottom: '1rem' }}>
                      <Text>{postDescription(recipe)}</Text>
                    </Row>
                  </animated.div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </StyledDiv>
  )
}

export default DetailedTimeline
