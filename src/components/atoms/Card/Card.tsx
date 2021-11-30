import styled from 'styled-components'

type CardProps = {
  side?: 'left' | 'right'
  className?: string
}

const Card = styled.div.attrs((props) => ({
  className: `atom-card ${props.className}`,
}))<CardProps>`
  background-color: ${({ theme }) => theme.colors.mono_1};
  border-radius: ${({ side }) => {
    switch (side) {
      case 'left':
        return '0 15px 15px 0'
      case 'right':
        return '15px 0 0 15px'
      default:
        return '15px'
    }
  }};

  padding: 16px;
`

export default Card
