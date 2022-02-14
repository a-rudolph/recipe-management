import {
  getTimelineSteps,
  hoursToTimeString,
  hoursToDuration,
} from '@utils/timeline'
import { useTrail, animated } from 'react-spring'
import { Button, Row, Text } from '@components/atoms'
import { clamp } from '@utils/clamp'
import responsive from '@constants/responsive'
import LeftIcon from '@components/icons/Left'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100%;

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
      background: ${({ theme }) => theme.colors.secondary_1};
    }
  }

  .main-row {
    border-bottom: 1px solid ${({ theme }) => theme.colors.wheaty_1};
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
    border: 6px solid ${({ theme }) => theme.colors.secondary_1};
    background: ${({ theme }) => theme.colors.wheaty_1};
  }

  .time-oval {
    margin-bottom: -4px;
    margin-right: -18px;
    padding: 4px 16px;
    border-radius: 60px;
    background: ${({ theme }) => theme.colors.secondary_1};
  }

  @media screen and (min-width: ${responsive.md}px) {
    min-width: 320px;
  }
`

const StyledButton = styled(Button)`
  &.go-back-button {
    margin-left: -16px;
    display: flex;
    align-items: center;
    width: calc(100% + 20px);

    .left-icon-wrap {
      margin-right: 8px;
      margin-bottom: 2px;
    }
  }
`

export const BackButton = ({
  onBack,
  children,
}: {
  onBack?: VoidFunction
  children: React.ReactNode
}) => {
  return (
    <StyledButton onClick={onBack} className='go-back-button' type='ghost'>
      <div className='left-icon-wrap'>
        <Text color='wheaty_1'>
          <LeftIcon size={12} />
        </Text>
      </div>
      {children}
    </StyledButton>
  )
}

const DetailedTimeline = ({
  recipe,
  onBack,
}: {
  recipe: RecipeType
  onBack?: VoidFunction
}) => {
  const steps = getTimelineSteps(recipe)

  const trail = useTrail(steps.length, {
    config: { mass: 5, tension: 1000, friction: 300 },
    from: { opacity: 0, height: 0 },
    height: 'auto',
    opacity: 1,
  })

  return (
    <StyledDiv>
      <Row style={{ justifyContent: 'space-between', alignItems: 'start' }}>
        <BackButton onBack={onBack}>
          <Text color='wheaty_3'>{recipe.name}</Text>
        </BackButton>
        <Text.h1 style={{ marginBottom: '16px' }}>Schedule</Text.h1>
      </Row>
      <div className='main-col'>
        <div className='vert-line' />
        <div className='timeline-content'>
          {steps.map((step, i) => (
            <animated.div style={trail[i]} key={i}>
              <Row className='main-row' justify='space-between' align='center'>
                <Text.h1 style={{ margin: 0 }} weight={600} color='wheaty_2'>
                  {step.title}
                </Text.h1>
                <div className='time-oval'>
                  <Text>{hoursToTimeString(step.time)}</Text>
                </div>
              </Row>
              {step.break && (
                <Row
                  className='break-row'
                  style={{ height: `${clamp(0.5, step.duration, 3) * 3}rem` }}
                >
                  <Text fs='18px' secondary>
                    {step.break}
                  </Text>
                  <Text
                    style={{ margin: '0 4px' }}
                    fs='18px'
                    secondary
                    color='wheaty_1'
                  >
                    {hoursToDuration(step.duration)}
                  </Text>
                  <div className='dot' />
                </Row>
              )}
            </animated.div>
          ))}
        </div>
      </div>
    </StyledDiv>
  )
}

export default DetailedTimeline
