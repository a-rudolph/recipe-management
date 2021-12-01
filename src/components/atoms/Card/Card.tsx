import styled from 'styled-components'

type CardProps = {
  side?: 'left' | 'right'
  className?: string
}

const Card = styled.div.attrs(({ className = '' }) => ({
  className: `atom-card ${className}`,
}))<CardProps>`
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

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.mono_1};
  padding: 16px;
`

export default Card
