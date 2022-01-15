import styled from 'styled-components'

type CardProps = {
  side?: 'left' | 'right'
  className?: string
  onClose?: VoidFunction
} & React.HTMLAttributes<HTMLDivElement>

const Card = styled.div.attrs<CardProps>({
  className: `atom-card`,
})<CardProps>`
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
  position: relative;
`

const Close = styled.button`
  top: 0;
  right: 8px;
  position: absolute;
  padding: 4px 8px;
  background: transparent;
  opacity: 0.6;
  border: none;
  font-size: 24px;
  color: white;

  transition: all 0.1s;
  &:hover {
    opacity: 0.8;
  }
`

export default ({ children, onClose, ...rest }: CardProps) => {
  return (
    <Card {...rest}>
      {onClose && <Close onClick={onClose}>x</Close>}
      {children}
    </Card>
  )
}
