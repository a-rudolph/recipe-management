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
`

type TextProps = {
  children: React.ReactNode
  color?: string
  fs?: string
  weight?: number
}

export default function Text({
  children,
  color = theme.colors.wheaty_2,
  fs = '16px',
  weight = 400,
}: TextProps) {
  return (
    <StyledText $color={color} $weight={weight} $fontSize={fs}>
      {children}
    </StyledText>
  )
}
