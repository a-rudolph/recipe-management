import { getColor, getStyle } from '@styles/themes'
import breakpoints from '@constants/breakpoints'
import styled from 'styled-components'

type ButtonProps = {
  side?: 'left' | 'right'
  type?: 'primary' | 'ghost' | 'secondary'
  onClose?: VoidFunction
  icon?: React.ReactNode
  block?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const Button = styled.button.attrs<ButtonProps>({
  className: `atom-button`,
})<ButtonProps>`
  font-size: 24px;
  border-radius: 24px;
  opacity: 0.9;
  padding: 4px 16px;

  &.primary {
    border: 1px solid ${getColor('wheaty_1')};
    color: ${getColor('wheaty_1')};
    background-color: transparent;
  }

  &.block {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: ${getColor('text_1')};
  }

  @media screen and (min-width: ${breakpoints.sm}px) {
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
  type = 'secondary',
  children,
  onClose,
  icon,
  block,
  ...rest
}: ButtonProps) => {
  let className: string = icon ? 'ghost' : type

  className = block ? `${className} block` : className

  return (
    <Button className={className} {...rest}>
      {icon}
      {children}
    </Button>
  )
}
