import { animated, useSpring } from 'react-spring'
import { Col, Row } from 'antd'
import { createResponsiveStyle, getColor } from '@/styles/themes'
import {
  hoursToDuration,
  hoursToTimeString,
  TimelineStepData,
} from '@/utils/timeline'
import { useEffect, useMemo, useState } from 'react'
import _isNumber from 'lodash/isNumber'
import { clamp } from '@/utils/clamp'
import { renderDangerous } from '@/utils/dangerous-renders'
import styled from 'styled-components'
import { Text } from '@/components/atoms'
import { useCurrentRecipeStore } from 'stores/current-recipe'
import { useDeviceType } from '@/hooks/useDeviceType'

const StyledButton = styled.button`
  width: 100%;
  cursor: pointer;

  ${createResponsiveStyle.mobile`
    user-select: none;
  `}

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

  &.active {
    .main-row {
      border-bottom: 1px solid ${getColor('wheaty_1')};
    }
  }

  &:not(.default) {
    &.active .time-oval .atom-text,
    &:not(.active) .atom-text {
      opacity: 0.6;
      color: ${getColor('text_2')};
    }

    &.active .time-oval .atom-text,
    &.upcoming .help-column .atom-text {
      color: ${getColor('text_1')};
      opacity: 1;
    }
  }

  &.upcoming .time-oval.holding {
    animation: focus-on 3s ease;
  }

  @keyframes focus-on {
    10% {
      box-shadow: none;
    }
    11% {
      box-shadow: 0 0 8px 4px ${getColor('wheaty_1')};
    }
    100% {
      box-shadow: 0 0 0px 2px ${getColor('wheaty_1')};
    }
  }
`

type TimelineItemProps = {
  step: TimelineStepData
  showHelp: boolean
  stepIndex: number
}

const TimelineItem = ({ step, showHelp, stepIndex }: TimelineItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const { setStep, step: currentStep } = useCurrentRecipeStore(
    ({ setStep, step }) => ({
      setStep,
      step,
    })
  )

  useEffect(() => {
    if (stepIndex === currentStep) {
      setIsCollapsed(false)
    }
  }, [currentStep, stepIndex])

  const status = useMemo(() => {
    if (stepIndex === currentStep) {
      return 'active'
    }

    if (stepIndex - 1 === currentStep) {
      return 'upcoming'
    }

    if (_isNumber(currentStep)) {
      return 'inactive'
    }

    return 'default'
  }, [stepIndex, currentStep])

  const isActive = status === 'active'

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

  const [holdingTimeout, setHoldingTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  const { isDesktop } = useDeviceType()

  const touchStart = () => {
    setHoldingTimeout(
      setTimeout(() => {
        setStep(stepIndex)
        setHoldingTimeout(null)
        setIsCollapsed(false)
      }, 2_000)
    )
  }

  const touchEnd = () => {
    if (holdingTimeout) {
      clearTimeout(holdingTimeout)
      setHoldingTimeout(null)

      if (isDesktop) {
        toggle()
      }
    }
  }

  return (
    <StyledButton
      className={status.concat(isCollapsed ? ' closed' : ' open')}
      onClick={() => {
        if (isDesktop) return

        toggle()
      }}
      onMouseDown={touchStart}
      onTouchStart={touchStart}
      onMouseUp={touchEnd}
      onTouchEnd={touchEnd}
    >
      <Row className='main-row' justify='space-between' align='middle'>
        <Col>
          <Text
            fs='h4'
            weight={600}
            color={isActive ? 'wheaty_1' : 'text_1'}
            style={{
              letterSpacing: '1px',
              textTransform: isActive ? 'uppercase' : 'none',
            }}
          >
            {title}
          </Text>
        </Col>
        <Col className={'time-oval'.concat(holdingTimeout ? ' holding' : '')}>
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
          {status === 'upcoming' && (
            <Text fs='small' color='text_1'>
              hold for next step
            </Text>
          )}
        </Col>
      </Row>
      <animated.div style={style}>
        <Row className='description'>
          <Text>{renderDangerous.span(description)}</Text>
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
            <Text>{renderDangerous.span(postDescription)}</Text>
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
              <Text>{renderDangerous.span(preDescription)}</Text>
            </Col>
          </Row>
        </animated.div>
      )}
    </StyledButton>
  )
}

export default TimelineItem
