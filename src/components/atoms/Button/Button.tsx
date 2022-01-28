import styled from 'styled-components'

type ButtonProps = {
  side?: 'left' | 'right'
  type?: 'primary' | 'ghost'
  onClose?: VoidFunction
  icon?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Button = styled.div.attrs<ButtonProps>({
  className: `atom-button`,
})<ButtonProps>`
  opacity: 0.8;
  font-size: 24px;
  border-radius: 4px;

  &.primary {
    border: 1px solid ${({ theme }) => theme.colors.wheaty_1};
    color: ${({ theme }) => theme.colors.wheaty_1};
  }

  &.ghost {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.wheaty_2};
  }

  transition: all 0.1s;
  &:hover {
    opacity: 1;
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
