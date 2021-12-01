import { Text } from '@components/atoms'
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

export default function SimpleTimeline() {
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
          <Text>7:30</Text>
        </div>
        <div className='line' />
        <div className='time'>
          <Text>13:30</Text>
        </div>
        <div className='line' />
        <div className='time'>
          <Text>14:30</Text>
        </div>
      </Grid>
    </StyledDiv>
  )
}
