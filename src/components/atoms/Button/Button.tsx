import { getColor, getStyle } from '@styles/themes'
import responsive from '@constants/responsive'
import styled from 'styled-components'

type ButtonProps = {
  side?: 'left' | 'right'
  type?: 'primary' | 'ghost' | 'secondary'
  onClose?: VoidFunction
  icon?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Button = styled.div.attrs<ButtonProps>({
  className: `atom-button`,
})<ButtonProps>`
  font-size: 24px;
  border-radius: 24px;
  opacity: 0.9;
  padding: 4px 16px;

  &.primary {
    border: 1px solid ${getColor('wheaty_1')};
    color: ${getColor('wheaty_1')};
  }

  &.secondary {
    color: ${getColor('secondary_1')};
    background-color: ${getColor('wheaty_1')};
    box-shadow: ${getStyle('shade', 'button')};
  }

  &.ghost {
    background: transparent;
    border: none;
    padding: 0;
    color: ${getColor('wheaty_2')};
  }

  @media screen and (min-width: ${responsive.sm}px) {
    opacity: 0.8;
  }

  transition: all 0.1s;
  &:hover {
    opacity: 1;
  }

  &:active {
    box-shadow: none;
  }

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

export default ({
  type = 'primary',
  children,
  onClose,
  icon,
  ...rest
}: ButtonProps) => {
  const className = icon ? 'ghost' : type

  return (
    <Button className={className} {...rest}>
      {icon}
      {children}
    </Button>
  )
}
