import { useSpring, animated } from 'react-spring'
import {
  hoursToTimeString,
  hoursToDuration,
  TimelineStepData,
} from '@utils/timeline'
import { clamp } from '@utils/clamp'
import { getColor } from '@styles/themes'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import { Text } from '@components/atoms'
import { useState } from 'react'

const StyledButton = styled.button`
  width: 100%;
  cursor: pointer;

  background: transparent;
  border: none;
  padding: 0px;

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

    transition: border-width 0.1s ease;
  }

  &.open,
  &:hover {
    .dot {
      border-width: 4px;
    }
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
    pointer-events: none;
  }

  .pre-text {
    text-align: center;
    padding: 0 16px;
  }
`

type TimelineItemProps = {
  step: TimelineStepData
}

const TimelineItem = ({ step }: TimelineItemProps) => {
  const [isShortView, setShortView] = useState(true)

  const style = useSpring({
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: !isShortView ? 1 : 0,
    x: !isShortView ? 0 : 20,
    maxHeight: !isShortView ? 110 : 0,
    from: { opacity: 0, x: 20, maxHeight: 0 },
  })

  const {
    title,
    time,
    duration,
    subTitle,
    preDescription,
    description,
    postDescription,
  } = step

  const toggle = () => {
    setShortView((prev) => !prev)
  }

  return (
    <StyledButton className={isShortView ? 'closed' : 'open'} onClick={toggle}>
      <Row className='main-row' justify='space-between' align='middle'>
        <Text fs='h4' weight={600} color='text_1'>
          {title}
        </Text>
        <div className='time-oval'>
          <Text fs='h5'>{hoursToTimeString(time)}</Text>
        </div>
      </Row>
      <animated.div style={style}>
        <Row className='description'>
          <Text>{description}</Text>
        </Row>
      </animated.div>
      {subTitle && (
        <Row
          className='subTitle-row'
          style={{ height: `${clamp(0.5, duration, 1) * 3}rem` }}
        >
          <Text secondary>{subTitle}</Text>
          <Text style={{ margin: '0 4px' }} secondary color='wheaty_1'>
            {hoursToDuration(duration)}
          </Text>
          <div className='dot' />
        </Row>
      )}
      {postDescription && (
        <animated.div style={style}>
          <Row className='post-text' style={{ marginBottom: '1rem' }}>
            <Text>{postDescription}</Text>
          </Row>
        </animated.div>
      )}
      {preDescription && (
        <animated.div style={style}>
          <Row
            className='pre-text'
            justify='center'
            style={{ marginBottom: '1rem' }}
          >
            <Col>
              <Text>{preDescription}</Text>
            </Col>
          </Row>
        </animated.div>
      )}
    </StyledButton>
  )
}

export default TimelineItem
