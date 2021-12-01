import { Text } from '@components/atoms'
import moment from 'moment'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 8px 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;

  &.label-row {
    display: flex;
    justify-content: space-between;

    .label {
      padding: 0 4px;
      width: 60px;
    }
  }

  max-width: 280px;

  .line,
  .time {
    background-color: ${({ theme }) => theme.colors.secondary_1};
  }

  .time {
    width: 60px;
    border-radius: 50px;
    text-align: center;
    padding: 4px;

    font-size: 18px;
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
    mix: mix.format('H:mm'),
    shape: shape.format('H:mm'),
    bake: bake.format('H:mm'),
  }
}

export default function SimpleTimeline(props: SimpleTimelineProps) {
  const { mix, shape, bake } = getTimeStrings(props)

  return (
    <StyledDiv>
      <Grid className='label-row'>
        <div className='label'>
          <Text secondary fs='18px'>
            mix
          </Text>
        </div>
        <div className='label'>
          <Text secondary fs='18px'>
            shape
          </Text>
        </div>
        <div className='label'>
          <Text secondary fs='18px'>
            bake
          </Text>
        </div>
      </Grid>
      <Grid>
        <div className='time'>
          <Text>{mix}</Text>
        </div>
        <div className='line' />
        <div className='time'>
          <Text>{shape}</Text>
        </div>
        <div className='line' />
        <div className='time'>
          <Text>{bake}</Text>
        </div>
      </Grid>
    </StyledDiv>
  )
}
