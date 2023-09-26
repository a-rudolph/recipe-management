import { getColor, getStyle } from '@/styles/themes'
import breakpoints from '@/constants/breakpoints'
import styled from 'styled-components'

type ButtonProps = {
  side?: 'left' | 'right'
  type?: 'primary' | 'ghost' | 'secondary'
  icon?: React.ReactNode
  block?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const StyledButton = styled.button.attrs<ButtonProps>({
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
    box-shadow: ${getStyle('shadows', 'button')};
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

const Button = ({
  type = 'secondary',
  children,
  icon,
  block,
  className = '',
  ...rest
}: ButtonProps) => {
  let extraClass: string = icon ? 'ghost' : type

  extraClass = block ? `${extraClass} block` : extraClass

  return (
    <StyledButton className={`${extraClass} ${className}`} {...rest}>
      {icon}
      {children}
    </StyledButton>
  )
}

export default Button
