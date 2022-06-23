import { animated, useSpring } from 'react-spring'
import { Col, Row } from 'antd'
import {
  hoursToDuration,
  hoursToTimeString,
  TimelineStepData,
} from '@utils/timeline'
import { clamp } from '@utils/clamp'
import DOMPurify from 'isomorphic-dompurify'
import { getColor } from '@styles/themes'
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
  }

  .help-column {
    height: 18px;
    padding: 2px 2px 0;
    margin-right: 48px;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  &:hover {
    .help-column {
      opacity: 1;
    }
  }

  &.open {
    .help-column {
      opacity: 0;
    }
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
    height: max-content;
    width: calc(100% - 64px);
    text-align: justify;
    pointer-events: none;
  }

  .pre-text {
    text-align: center;
    padding: 0 8px;
  }

  b {
    color: ${getColor('wheaty_1')};
    letter-spacing: 1px;
  }
`

type TimelineItemProps = {
  step: TimelineStepData
  showHelp: boolean
}

const TimelineItem = ({ step, showHelp }: TimelineItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const style = useSpring({
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: isCollapsed ? 0.5 : 1,
    x: isCollapsed ? 20 : 0,
    maxHeight: isCollapsed ? 0 : 140,
    overflow: 'hidden',
  })

  const {
    title,
    time,
    duration,
    subTitle,
    description,
    preDescription,
    postDescription,
  } = step

  const toggle = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <StyledButton className={isCollapsed ? 'closed' : 'open'} onClick={toggle}>
      <Row className='main-row' justify='space-between' align='middle'>
        <Col>
          <Text
            fs='h4'
            weight={600}
            color='text_1'
            style={{ letterSpacing: '1px' }}
          >
            {title}
          </Text>
        </Col>
        <Col className='time-oval'>
          <Text fs='h5'>{hoursToTimeString(time)}</Text>
        </Col>
      </Row>
      <Row justify='end'>
        <Col className='help-column'>
          {showHelp && (
            <Text fs='small' color='text_2'>
              click to show details
            </Text>
          )}
        </Col>
      </Row>
      <animated.div style={style}>
        <Row className='description'>
          <Text>{renderDangerousSpan(description)}</Text>
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
            <Text>{renderDangerousSpan(postDescription)}</Text>
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
              <Text>{renderDangerousSpan(preDescription)}</Text>
            </Col>
          </Row>
        </animated.div>
      )}
    </StyledButton>
  )
}

export default TimelineItem

const renderDangerousSpan = (html: string = '') => {
  const sanitized = DOMPurify.sanitize(html)

  return <span dangerouslySetInnerHTML={{ __html: sanitized }} />
}
