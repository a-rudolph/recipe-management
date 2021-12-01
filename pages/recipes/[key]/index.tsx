import { GetStaticPaths, GetStaticProps } from 'next'
import { Card, Row, Text } from '@components/atoms'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import SimpleTimeline from '@components/SimpleTimeline'
import styled from 'styled-components'
import fractionize from '@utils/fractionize'

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .atom-card {
    width: 80vw;
    height: 60vh;
  }
`

const StyledTimes = styled.div`
  margin: 20px 0;
  width: max-content;

  .time-row-grid {
    display: grid;
    grid-column-gap: 6px;

    grid-template-columns: 1fr 80px;
  }

  .time-label {
    justify-self: right;
  }

  .time-divider {
    height: 1px;
    margin: 8px 0;
    background-color: ${({ theme }) => theme.colors.wheaty_1};
  }
`

const TimeRow = ({ label, hours }: { label: string; hours: number }) => {
  return (
    <div className='time-row-grid'>
      <Text
        className='time-label'
        fs='18px'
        secondary
        weight={400}
        color='wheaty_2'
      >
        {label}:
      </Text>
      <Text weight={500} fs='18px' color='wheaty_1'>
        {fractionize(hours)} hours
      </Text>
    </div>
  )
}

export default function RecipeDetail({ recipe }: { recipe: RecipeType }) {
  const { name, start, bulk, proof } = recipe

  return (
    <StyledDiv>
      <Card side='right'>
        <Text weight={500} fs='32px' color='wheaty_1'>
          {name}
        </Text>
        <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        <StyledTimes>
          <TimeRow label='bulk ferment' hours={bulk} />
          <div className='time-divider' />
          <TimeRow label='proofing' hours={proof} />
        </StyledTimes>
      </Card>
    </StyledDiv>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    ...getRecipePaths(),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    ...getRecipeProps(params),
  }
}
