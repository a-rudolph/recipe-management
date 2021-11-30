import { theme } from '@styles/themes'
import styled from 'styled-components'

type StyledTextProps = {
  $color: string
  $fontSize: string
  $weight: number
}

const StyledText = styled.span<StyledTextProps>`
  color: ${({ $color }) => $color};
  font-weight: ${({ $weight }) => $weight};
  font-size: ${({ $fontSize }) => $fontSize};
  font-family: Roboto;
`

type TextProps = {
  children: React.ReactNode
  color?: string
  fs?: string
  weight?: number
  style?: React.CSSProperties
}

export default function Text({
  children,
  color = theme.colors.wheaty_2,
  fs = '16px',
  weight = 400,
  ...rest
}: TextProps) {
  return (
    <StyledText {...rest} $color={color} $weight={weight} $fontSize={fs}>
      {children}
    </StyledText>
  )
}
