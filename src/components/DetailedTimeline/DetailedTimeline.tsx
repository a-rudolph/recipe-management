import { Button, Row, Text } from '@components/atoms'
import DetailIcon from '@components/icons/Detail'
import responsive from '@constants/responsive'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100%;

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
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.secondary_1};
    border: 2px solid ${({ theme }) => theme.colors.wheaty_1};
    margin: 8px;
  }

  .time-oval {
    margin-bottom: -1px;
    margin-right: -18px;
    padding: 4px 16px;
    border-radius: 60px;
    background: ${({ theme }) => theme.colors.secondary_1};
  }

  @media screen and (min-width: ${responsive.md}px) {
    min-width: 320px;
  }
`

const DetailedTimeline = (props: { recipe: RecipeType }) => {
  //   const { name, start, bulk, proof, ingredients } = props.recipe

  const steps = [
    {
      title: 'autolyse',
      break: 'autolysis',
      length: 0.5,
      time: '7:30 am',
      pause: '30 minutes',
    },
    {
      title: 'mix',
      break: 'bulk fermentation',
      length: 3,
      time: '8:00 am',
      pause: '6 hours',
    },
    {
      title: 'shape',
      break: 'proofing',
      length: 1.5,
      time: '1:30 pm',
      pause: '1.5 hours',
    },
    {
      title: 'bake',
      break: 'baking',
      length: 0.75,
      time: '3:15 pm',
      pause: '1 hour',
    },
    {
      title: 'ready to eat',
      time: '4:15 pm',
    },
  ]

  return (
    <StyledDiv>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Button type='ghost' style={{ margin: '8px 0' }}>
          <DetailIcon />
        </Button>
        <Text.h0 style={{ marginBottom: '16px' }}>Schedule</Text.h0>
      </Row>
      {steps.map((step) => (
        <>
          <Row className='main-row' style={{ justifyContent: 'space-between' }}>
            <Text.h1 style={{ margin: 0 }} weight={600} color='wheaty_2'>
              {step.title}
            </Text.h1>
            <div className='time-oval'>
              <Text>{step.time}</Text>
            </div>
          </Row>
          {step.break && (
            <Row
              className='break-row'
              style={{ height: `${step.length * 3}rem` }}
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
                {step.pause}
              </Text>
              <div className='dot' />
            </Row>
          )}
        </>
      ))}
    </StyledDiv>
  )
}

export default DetailedTimeline
