import { Text, Row } from '@components/atoms'
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
    padding: 8px 24px;

    background-color: ${({ theme }) => theme.colors.secondary_1};
    justify-content: space-between;
  }
`

const IngredientDisplay = ({ ingredients }: IngredientDisplayProps) => {
  return (
    <StyledDiv>
      <Row className='yield-row'>
        <Text fs='18px' secondary weight={400}>
          fills two 10-in banneton
        </Text>
        <Text fs='24px'>2 loaves</Text>
      </Row>
      {ingredients.map(({ name, extra, quantity, unit }, i) => (
        <Row key={`${name}-${i}`} className='ing-row'>
          <Text fs='24px'>
            {name}{' '}
            <Text secondary fs='16px' weight={400} color='wheaty_2'>
              {extra}
            </Text>
          </Text>
          <Text fs='24px'>
            {quantity} {unit}
          </Text>
        </Row>
      ))}
    </StyledDiv>
  )
}

export default IngredientDisplay
