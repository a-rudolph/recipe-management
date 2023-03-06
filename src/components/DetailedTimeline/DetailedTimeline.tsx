import breakpoints from '@constants/breakpoints'
import { getColor } from '@styles/themes'
import styled from 'styled-components'
import TimelineItem from '@components/TimelineItem'
import { useTimelineSteps } from '@utils/timeline'

const StyledDiv = styled.div`
  width: calc(100% - 16px);
  margin: 0 16px;

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
  const steps = useTimelineSteps(recipe)

  return (
    <StyledDiv>
      <div className='main-col'>
        <div className='vert-line' />
        <div className='timeline-content'>
          {steps.map((step, i) => (
            <TimelineItem
              key={i}
              stepIndex={i}
              showHelp={i === 0}
              step={step}
            />
          ))}
        </div>
      </div>
    </StyledDiv>
  )
}

export default DetailedTimeline
