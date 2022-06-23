import { Row, Text } from '@components/atoms'
import { formatNumber } from '@utils/formatNumber'
import styled from 'styled-components'

type IngredientDisplayProps = {
  ingredients: IngredientType[]
}

const StyledDiv = styled.div`
  .yield-row {
    align-items: baseline;
    justify-content: space-between;
  }

  .ing-row {
    margin: 8px -24px;
    padding: 4px 24px;

    background-color: ${({ theme }) => theme.colors.secondary_1};
    justify-content: space-between;
  }
`

const IngredientDisplay = ({ ingredients }: IngredientDisplayProps) => {
  return (
    <StyledDiv>
      <Row className='yield-row'>
        <Text secondary>fills two 10-in banneton</Text>
        <Text fs='h4'>2 loaves</Text>
      </Row>
      {ingredients.map(({ name, extra, quantity, unit }, i) => (
        <Row key={`${name}-${i}`} className='ing-row'>
          <Text fs='h4'>
            {name}{' '}
            <Text secondary weight={400} color='text_1'>
              {extra}
            </Text>
          </Text>
          <Text fs='h4'>
            {formatNumber(quantity)} {unit}
          </Text>
        </Row>
      ))}
    </StyledDiv>
  )
}

export default IngredientDisplay
