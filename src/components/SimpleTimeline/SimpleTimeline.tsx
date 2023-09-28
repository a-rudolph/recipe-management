import moment from 'moment'
import styled from 'styled-components'
import { Text } from '@/components/atoms'
import DayNight from '../DayNight'

const StyledDiv = styled.div`
  margin: 8px 0;
  width: 286px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;

  &.label-row {
    display: flex;
    justify-content: space-between;

    .label {
      padding: 2px 4px;
      width: 70px;
      line-height: 1;
    }
  }

  .line,
  .time {
    background-color: ${({ theme }) => theme.colors.secondary_1};
  }

  .time {
    min-width: 72px;
    border-radius: 50px;
    text-align: center;
    padding: 4px 12px 4px 8px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .line {
    height: 2px;
    align-self: center;
  }
`

type SimpleTimelineProps = {
  start: number
  proof: number
  bulk: number
}

type SimpleTimelineData = {
  mix: string
  shape: string
  bake: string
  raw: {
    mix: moment.Moment
    shape: moment.Moment
    bake: moment.Moment
  }
}

const getTimeStrings = ({
  start,
  bulk,
  proof,
}: SimpleTimelineProps): SimpleTimelineData => {
  const mix = moment({
    hours: 0,
    minutes: 0,
    seconds: 0,
  }).add(start, 'hours')

  const shape = moment(mix).add(bulk, 'hours')
  const bake = moment(shape).add(proof, 'hours')

  return {
    mix: mix.format('h a'),
    shape: shape.format('h a'),
    bake: bake.format('h a'),
    raw: {
      mix,
      shape,
      bake,
    },
  }
}

const SimpleTimeline = (props: SimpleTimelineProps) => {
  const { mix, shape, bake, raw } = getTimeStrings(props)

  return (
    <StyledDiv>
      <Grid className='label-row'>
        <div className='label'>
          <Text fs='h5' secondary>
            mix
          </Text>
        </div>
        <div className='label'>
          <Text fs='h5' secondary>
            shape
          </Text>
        </div>
        <div className='label'>
          <Text fs='h5' secondary>
            bake
          </Text>
        </div>
      </Grid>
      <Grid>
        <div className='time'>
          <DayNight time={raw.mix} />
          <Text fs='h5'>{mix}</Text>
        </div>
        <div className='line' />
        <div className='time'>
          <DayNight time={raw.shape} />
          <Text fs='h5'>{shape}</Text>
        </div>
        <div className='line' />
        <div className='time'>
          <DayNight time={raw.bake} />
          <Text fs='h5'>{bake}</Text>
        </div>
      </Grid>
    </StyledDiv>
  )
}

export default SimpleTimeline
